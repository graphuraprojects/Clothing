import express from "express";
import {
  createCategory,
  getAllCategories,
  deleteCategory
} from "../controllers/category.controller.js";

import {protect} from "../middlewares/auth.middleware.js";

import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", protect, isAdmin, createCategory);
router.delete("/:id", protect, isAdmin, deleteCategory);

export default router;
