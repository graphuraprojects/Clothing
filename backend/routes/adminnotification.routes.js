import express from "express";
import {protect} from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import Notification from "../models/Notification.model.js";



const router = express.Router();

// router.use(protect, isAdmin);

router.use((req, res, next) => {
  console.log("🔥 ADMIN NOTIFICATION ROUTE HIT");
  next();
});


/* GET ALL NOTIFICATIONS */
router.get("/", async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  res.json(notifications);
});

/* MARK AS READ */
router.put("/:id/read", async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ success: true });
});

export default router;
