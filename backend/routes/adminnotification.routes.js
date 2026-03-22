import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import Notification from "../models/Notification.model.js";



const router = express.Router();

router.use(protect, isAdmin);


/* GET ALL NOTIFICATIONS */
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error("NOTIFICATION LIST ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

/* MARK AS READ */
router.put("/:id/read", async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (err) {
    console.error("NOTIFICATION UPDATE ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;
