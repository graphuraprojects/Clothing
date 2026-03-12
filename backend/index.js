import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();
// import path  from "path";

// import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/admin.product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import "./scripts/earlyOffer.js";

// import productRoutes from "./routes/admin.product.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import userRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/order.routes.js";
import userdashboardRoutes from "./routes/userdashboard.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import tryOnRoutes from "./routes/tryon.routes.js";
import whatsappRoutes from "./routes/whatsapp.routes.js";
import couponRoutes from "./routes/coupons.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import refundRoutes from "./routes/refund.routes.js";
import adminRefundRoutes from "./routes/adminrefund.routes.js";
import adminNotificationRoutes from "./routes/adminnotification.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

const PORT = process.env.PORT || 4000;

/* ================= MIDDLEWARE ================= */
app.use(express.json()); // 🔥 REQUIRED for req.body
app.use(express.urlencoded({ extended: true }));

// comment
// new
//* ================= ROUTES ================= */

// PUBLIC / USER

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/user/dashboard", userdashboardRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/refunds", refundRoutes);
app.use("/api", collectionRoutes);
app.use("/api", tryOnRoutes);

// 🔥 ADMIN – SPECIFIC ROUTES FIRST
app.use("/api/admin/notifications", adminNotificationRoutes);
app.use("/api/admin/refunds", adminRefundRoutes);
app.use("/api/admin/dashboard/inventory", inventoryRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/admin/whatsapp", whatsappRoutes);

// 🔥 ADMIN ROOT – ALWAYS LAST
app.use("/api/admin", adminRoutes);
app.use("/api", subscriptionRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("Graphura Backend is running 🚀");
});
console.log("JWT_SECRET:", process.env.JWT_SECRET);

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
  });
