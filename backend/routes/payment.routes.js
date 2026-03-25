import express from "express";
import crypto from "crypto";
import Payment from "../models/payment.model.js";
import Order from "../models/order.model.js";
import { razorpay } from "../utils/razorpay.js";
import {protect} from "../middlewares/auth.middleware.js";

const router = express.Router();

/* ===============================
   CREATE RAZORPAY ORDER
================================ */
router.post("/razorpay-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    console.log("RAZORPAY ORDER ERROR:", err);
    res.status(500).json({ message: "Unable to create Razorpay order" });
  }
});

/* ===============================
   VERIFY PAYMENT + CREATE ORDER + SAVE PAYMENT
================================ */
router.post("/razorpay-verify", protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shipping,
      items,
      subtotal,
      shippingCost,
      gst,
      discount,
      total,
      paymentMethod,
    } = req.body;

    /* ===== VERIFY SIGNATURE ===== */
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    /* ===== CREATE ORDER ===== */
    const order = await Order.create({
      user: req.user._id,
      items,
      shipping,
      subtotal,
      shippingCost,
      gst,
      discount,
      total,
      paymentMethod,
      paymentStatus: "paid",
      status: "Processing",
    });

    /* ===== SAFE USERNAME FALLBACK ===== */
    const userName =
      shipping?.fullName ||
      req.user?.name ||
      req.user?.email;

    /* ===== SAVE PAYMENT ===== */
    await Payment.create({
      user: req.user._id,
      userName,
      order: order._id,
      paymentId: razorpay_payment_id,
      method: paymentMethod,
      amount: total,
      status: "success",
    });

    res.json({
      success: true,
      orderId: order._id,
    });
  } catch (err) {
    console.log("PAYMENT VERIFY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
