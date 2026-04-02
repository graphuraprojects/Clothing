import Order from "../models/order.model.js";
import Invoice from "../models/invoices.model.js";
import Product from "../models/product.model.js";
import Inventory from "../models/inventory.model.js";
import twilio from "twilio";
import WhatsappLog from "../models/WhatsappLog.model.js";

import User from '../models/user.model.js'

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);


export const placeOrder = async (req, res) => {
  try {
    // const user = req.user;
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        message: "user not found"
      })
    }

    // 🔐 BLOCK UNPAID ONLINE ORDERS
    if (req.body.paymentMethod !== "cod" && !req.body.paymentVerified) {
      return res.status(400).json({
        message: "Payment not verified. Order not created.",
      });
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    /* ===== UPDATE INVENTORY ===== */
    for (const item of user.cart) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const variant = product.inventory.find(
        (v) => v.size === item.size && v.color === item.color
      );

      if (!variant || variant.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} (${item.color}/${item.size}) out of stock`,
        });
      }

      variant.stock -= item.quantity;
      product.totalSold += item.quantity;
      await product.save();

      await Inventory.create({
        product: product._id,
        size: item.size,
        color: item.color,
        change: -item.quantity,
        updatedBy: "Customer Order",
      });
    }

    /* ===== CREATE ORDER ===== */
    const order = await Order.create({
      user: user._id,

      // ✅ Use formatted items coming from frontend
      items: req.body.items,

      shipping: {
        fullName: req.body.shipping.fullName,
        email: req.body.shipping.email,
        address: req.body.shipping.address,
        city: req.body.shipping.city,
        state: req.body.shipping.state,
        zip: req.body.shipping.zip,
        phone: req.body.shipping.phone,
      },

      paymentMethod: req.body.paymentMethod,

      subtotal: req.body.subtotal,
      shippingCost: req.body.shippingCost,
      gst: req.body.gst,
      discount: req.body.discount,
      total: req.body.total,

      // status: "Processing",
      paymentStatus: req.body.paymentMethod === "cod" ? "pending" : "paid"
    });


    /* ===== AUTO WHATSAPP CONFIRMATION ===== */
    let phone = order.shipping.phone;

    if (phone.length === 10) phone = "+91" + phone;
    else if (!phone.startsWith("+")) phone = "+" + phone;

    const itemNames = order.items
      .map((i) => `${i.name} x${i.quantity}`)
      .join(", ");

    const message = `Hello ${order.shipping.fullName},

Thank you for your order! 🎉

🧾 Order ID: ${order._id}

📦 Items:
${itemNames}

💰 Total: ₹${order.total}

🚚 Status: Processing

– Graphura`;

    try {
      await client.messages.create({
        from: "whatsapp:+14155238886",
        to: `whatsapp:${phone}`,
        body: message,
      });

      await WhatsappLog.create({
        phone,
        template: "Order Confirmation",
        status: "Sent",
      });
    } catch (waErr) {
      console.log("WHATSAPP ERROR:", waErr.message);
    }

    /* ===== CLEAR CART ===== */
    user.cart = [];
    await user.save();

    /* ===== CREATE INVOICE ===== */
    /* ===== CREATE INVOICE ===== */
    if (
      order.paymentMethod === "cod" ||
      order.paymentStatus === "paid"
    ) {
      await Invoice.create({
        user: user._id,
        orderId: order._id,          // 🔥 LINK ORDER
        amount: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
      });
    }


    res.json({
      success: true,
      orderId: order._id,
      order,
    });
  } catch (err) {
    console.log("ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= MY ORDERS ================= */

export const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCustomerOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.params.id   // <-- customer id
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {

    console.log("ORDER STATUS API HIT");

    const { status } = req.body;
    const orderId = req.params.id;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ success: false });

    /* ===== WHATSAPP NOTIFICATION (non-blocking) ===== */
    try {
      let phone = order.shipping.phone;
      if (phone.length === 10) {
        phone = "+91" + phone;
      }
      else if (!phone.startsWith("+")) {
        phone = "+" + phone;
      }
      const itemNames = order.items.map(i => i.name).join(", ");

      const message = `Hello ${order.shipping.fullName},

Your order ${order._id}, Items:${itemNames}    
status is now:
${status}

Total: ₹${order.total}

– Graphura`;

      await client.messages.create({
        from: "whatsapp:+14155238886",
        to: `whatsapp:${phone}`,
        body: message
      });

      await WhatsappLog.create({
        phone,
        template: status,
        status: "Sent"
      });
    } catch (waErr) {
      console.log("WHATSAPP NOTIFICATION ERROR (non-blocking):", waErr.message);
    }

    res.json({ success: true });

  } catch (err) {
    console.log("STATUS ERROR:", err);
    res.status(500).json({ success: false });
  }
};
