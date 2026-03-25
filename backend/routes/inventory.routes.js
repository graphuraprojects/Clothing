import express from "express";
import {
  getAllInventory,
  updateInventory,
  getInventoryHistory,
  undoLastInventory
} from "../controllers/inventory.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getAllInventory);
router.post("/update", protect, isAdmin, updateInventory);
router.get("/history", protect, isAdmin, getInventoryHistory);
router.post("/undo", protect, isAdmin, undoLastInventory);



export default router;
