import express from "express";
import {protect} from "../middlewares/auth.middleware.js";
import { createRefundRequest } from "../controllers/refund.controller.js";

const router = express.Router();

router.post("/:orderId", protect, createRefundRequest);

export default router;
