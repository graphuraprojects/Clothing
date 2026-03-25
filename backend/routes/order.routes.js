import express from "express";
import {placeOrder,getMyOrders,getAllOrders,updateOrderStatus,getCustomerOrders} from "../controllers/order.controller.js";
import {protect} from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import Order from "../models/order.model.js";


const router = express.Router();
console.log("🔥 ORDER ROUTES LOADED");


router.post("/",protect,placeOrder);
router.get("/my",protect,getMyOrders);
router.get("/admin/all", protect, isAdmin, getAllOrders);

router.put("/admin/:id/status", protect, isAdmin, updateOrderStatus);
router.get( "/admin/dashboard/customer-orders/:id", protect,isAdmin, getCustomerOrders);


router.get(
  "/admin/:id",
  protect,
  isAdmin,
  async (req, res) => {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ order });
  }
);




export default router;
