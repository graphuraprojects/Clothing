// src/routes/dashboard.routes.js
import express from "express";
import {
  getDashboardStats,
  getMonthlyRevenue,
  getCategorySales,
  getRecentOrders,
  getRegionalDemand,exportAllOrders,getTopProducts,getCustomersAnalytics,getCustomerOrders,
  getAllPayments,getPaymentStats

} from "../controllers/dashboard.controller.js";
import  {protect}  from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.use(protect, isAdmin);

router.get("/stats", getDashboardStats);
router.get("/revenue", getMonthlyRevenue);
router.get("/category-sales", getCategorySales);
router.get("/", protect, isAdmin, getDashboardStats);
router.get("/regions", isAdmin, getRegionalDemand);
router.get("/recent-orders", isAdmin, getRecentOrders);
router.get("/export-orders", isAdmin, exportAllOrders);
router.get("/top-products", isAdmin, getTopProducts);
router.get("/customers", isAdmin, getCustomersAnalytics);
router.get("/customer-orders/:id", getCustomerOrders);
router.get("/payments", getAllPayments);
router.get("/payments/stats", getPaymentStats);
router.get("/payments/revenue-chart", getMonthlyRevenue);




export default router;
