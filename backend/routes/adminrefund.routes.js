import express from "express";
import {protect} from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import RefundRequest from "../models/RefundRequest.model.js";

const router = express.Router();

router.use(protect, isAdmin);

router.get("/", async (req, res) => {
  const requests = await RefundRequest.find()
    .populate("order")
    .populate("user", "name email");

  res.json(requests);
});

export default router;
