import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import RefundRequest from "../models/RefundRequest.model.js";

const router = express.Router();

router.use(protect, isAdmin);

router.get("/", async (req, res) => {
  try {
    const requests = await RefundRequest.find()
      .populate("order")
      .populate("user", "name email");

    res.json(requests);
  } catch (err) {
    console.error("ADMIN REFUND LIST ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;
