import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Address from "../models/address.model.js";
import Invoice from "../models/invoices.model.js";
// import Order from "../models/order.model.js";
// import PDFDocument from "pdfkit";
import { generateInvoicePDF } from "../utils/generateInvoicePDF.js";


/* SINGLE ORDER */

 export const getOrderDetails = async (req, res) => {
 try {

  const order = await Order.findById(req.params.id)
   .populate("items.product");   // ONLY real refs

  if (!order) return res.status(404).json({ message: "Order not found" });

  res.json({
   success: true,
   order,
  });

 } catch (err) {
  console.log("ORDER DETAILS ERROR:", err.message);
  res.status(500).json({ message: err.message });
 }
};


export const updateProfile = async (req, res) => {
 try {
  const user = await User.findByIdAndUpdate(
  req.user._id,
  {
   name: req.body.name,
   email: req.body.email,
   phone: req.body.phone,
   location: req.body.location,
   gender: req.body.gender,
   isTwoFactorEnabled: req.body.isTwoFactorEnabled
  },
  { new:true }
 ).select("-password");

 res.json({ success:true,user });
 } catch (err) {
  res.status(500).json({ message: err.message });
 }
};



/* GET INVOICES */

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user._id })
      .populate("orderId")   // ✅ MATCHES SCHEMA
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      invoices,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* DOWNLOAD */

// export const downloadInvoice = async (req, res) => {
//   try {
//     const invoiceId = req.params.id;

//     const pdfBuffer = await generateInvoicePDF(invoiceId);

//     res.set({
//       "Content-Type": "application/pdf",
//       "Content-Disposition": `attachment; filename=invoice-${invoiceId}.pdf`,
//       "Content-Length": pdfBuffer.length,
//     });

//     return res.send(pdfBuffer);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Invoice download failed" });
//   }
// };

export const downloadInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;

    const pdfBuffer = await generateInvoicePDF(invoiceId);

    if (!pdfBuffer) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${invoiceId}.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    return res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invoice download failed" });
  }
};



/* GET ADDRESSES */

export const getAddresses = async (req, res) => {
  const addresses = await Address.find({ user: req.user._id });

  res.json({ success: true, addresses });
};

/* CREATE / UPDATE */

export const saveAddress = async (req, res) => {
  if (req.body.default) {
    await Address.updateMany(
      { user: req.user._id },
      { default: false }
    );
  }

  if (req.params.id) {
    const updated = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.json({ success: true, address: updated });
  }

  const address = await Address.create({
    ...req.body,
    user: req.user._id,
  });

  res.json({ success: true, address });
};

/* DELETE */

export const deleteAddress = async (req, res) => {
  await Address.findByIdAndDelete(req.params.id);

  res.json({ success: true });
};


/* USER PROFILE */

export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password").lean();

  if (user && !user.location) {
    const defaultAddr = await Address.findOne({ user: req.user._id, default: true }).lean();
    if (defaultAddr) {
      user.location = defaultAddr.address;
    }
  }

  res.json({
    success: true,
    user,
  });
};

/* USER ORDERS */

export const getMyOrders = async (req, res) => {
 try {

  const orders = await Order.find({ user: req.user._id })
   .sort({ createdAt: -1 });

  res.json(orders);

 } catch (err) {
  console.log("MY ORDERS ERROR:", err.message);
  res.status(500).json({ message: err.message });
 }
};

