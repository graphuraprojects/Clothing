import express from "express";
import Collection from "../models/collection.model.js";
import {protect} from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

/* ================= CREATE COLLECTION (ADMIN) ================= */

router.post("/collections", protect, isAdmin, async (req, res) => {
    //  console.log("REQ BODY:", req.body);
  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ message: "Collection name required" });

    // Prevent duplicate
    const exists = await Collection.findOne({
  name,
  isActive: true
});


    if (exists)
      return res.status(400).json({ message: "Collection already exists" });

    const slug = name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

    const collection = await Collection.create({
      name,
      slug,
    });

    res.status(201).json(collection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET COLLECTIONS ================= */

router.get("/collections", async (req, res) => {
  try {
    const data = await Collection.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/collections/:id", protect, isAdmin, async (req, res) => {
 try {

  const col = await Collection.findByIdAndUpdate(
   req.params.id,
   { isActive: false },
   { new: true }
  );

  if (!col) {
   return res.status(404).json({ message: "Collection not found" });
  }

  res.json({
   success: true,
   message: "Collection deleted successfully"
  });

 } catch (err) {
  console.error(err);
  res.status(500).json({ message: "Server error" });
 }
});

export default router;
