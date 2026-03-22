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
import  protect  from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.use(protect, isAdmin);

router.get("/stats", getDashboardStats);
router.get("/revenue", getMonthlyRevenue);
router.get("/category-sales", getCategorySales);
router.get("/regions", getRegionalDemand);
router.get("/recent-orders", getRecentOrders);
router.get("/export-orders", exportAllOrders);
router.get("/top-products", getTopProducts);
router.get("/customers", getCustomersAnalytics);
router.get("/customer-orders/:id", getCustomerOrders);
router.get("/payments", getAllPayments);
router.get("/payments/stats", getPaymentStats);
router.get("/payments/revenue-chart", getMonthlyRevenue);




export default router;
