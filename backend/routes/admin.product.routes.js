import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  getProducts   // 👈 ADD PUBLIC
} from "../controllers/product.controller.js";

import {protect} from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

/* ========= PUBLIC ========= */

// PUBLIC LIST
router.get("/", getProducts);

// PUBLIC SINGLE
router.get("/:id", getSingleProduct);

/* ========= ADMIN ========= */

router.post("/", protect, isAdmin, upload.any(), addProduct);

router.get("/admin/all", protect, isAdmin, getAllProducts);

router.put("/:id", protect, isAdmin, upload.any(), updateProduct);

router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
