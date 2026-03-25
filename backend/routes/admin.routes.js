import express from "express";
import upload from "../middlewares/upload.middleware.js";

import {
 adminLogin,
 adminSignup,
 getAdminProfile,
 updateAdminEmail,
 updateAdminPassword,
 updateAdminAvatar
} from "../controllers/admin.controller.js";

import {protect} from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

const router = express.Router();

console.log("🔥 ADMIN ROUTES FILE LOADED — /signup and /login registered");

/* ================= AUTH ================= */

router.post("/signup", (req, res, next) => {
  console.log(">>> /api/admin/signup route matched");
  next();
}, adminSignup);

router.post("/login", (req, res, next) => {
  console.log(">>> /api/admin/login route matched");
  next();
}, adminLogin);

/* ================= PROFILE ================= */

router.get("/profile", protect, isAdmin, getAdminProfile);

router.put("/email", protect, isAdmin, updateAdminEmail);

router.put("/password", protect, isAdmin, updateAdminPassword);

router.put(
 "/avatar",
 protect,
 isAdmin,
 upload.single("avatar"),
 updateAdminAvatar
);

/* ================= DASHBOARD ================= */

router.get("/dashboard", protect, isAdmin, async (req, res) => {
 try {

  const orders = await Order.find();
  const revenue = orders.reduce((a, o) => a + (o.total || 0), 0);

  const users = await User.countDocuments();
  const products = await Product.countDocuments();
  const categories = await Category.countDocuments();

  res.json({
   revenue,
   orders: orders.length,
   users,
   products,
   categories
  });

 } catch (err) {
  console.log("ADMIN DASHBOARD ERROR:", err.message);
  res.status(500).json({ message: err.message });
 }
});

export default router;
