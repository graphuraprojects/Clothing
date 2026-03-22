import Product from "../models/product.model.js";
import mongoose from "mongoose";
import Collection from "../models/collection.model.js";
import slugify from "slugify";
import { notifySubscribersNewProduct } from "../utils/email.js";


/* ================================
   ADD PRODUCT (ADMIN ONLY)
================================ */
export const addProduct = async (req, res) => {
  try {

    /* ---------- COLORS ---------- */
    const colorsMeta = JSON.parse(req.body.colors || "[]");

    const colors = colorsMeta.map((c, i) => {
      const imgs = (req.files || [])
        .filter(f => f.fieldname === `colorImages_${i}`)
        .map(f => f.path);

      return {
        name: c.name,
        hex: c.hex,
        images: imgs,
      };
    });

    /* ---------- PRICE ---------- */
    const price = Number(req.body.price || 0);
    const percent = Number(req.body.discountPercent || 0);
    const discountPrice = Math.round(price - (price * percent) / 100);

    /* ---------- COLLECTIONS ---------- */
    let collections = [];
    if (req.body.collections) {
      const parsed =
        typeof req.body.collections === "string"
          ? JSON.parse(req.body.collections)
          : req.body.collections;

      collections = parsed.map(id => new mongoose.Types.ObjectId(id));
    }

    /* ---------- SIZES ---------- */
    const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];

    /* ---------- PRODUCT DATA ---------- */
    const productData = {
      name: req.body.name,
      slug: slugify(req.body.name, { lower: true }) + "-" + Date.now(),
      category: req.body.category,
      description: req.body.description,

      price,
      discountPercent: percent,
      discountPrice,

      sku: req.body.sku,
      sizes,
      collections,
      gender: req.body.gender || null,

      details: req.body.details ? JSON.parse(req.body.details) : {},
      colors,

      /* ✅ FLAGS */
      isTrending: req.body.isTrending === "true",
      isCarousel: req.body.isCarousel === "true",
      isPremium: req.body.isPremium === "true",
      isLimited: req.body.isLimited === "true",

      /* ✅ CAROUSEL FIELDS */
      carouselTitle: req.body.carouselTitle || "",
      carouselSubtitle: req.body.carouselSubtitle || "",
      carouselPriceText: req.body.carouselPriceText || "",

      createdBy: req.user?._id,
    };

    const product = await Product.create(productData);

    /* ---------- AUTO INVENTORY ---------- */
    product.inventory = [];

    sizes.forEach(size => {
      colors.forEach(c => {
        product.inventory.push({
          size,
          color: c.name,
          stock: 0,
        });
      });
    });

    await product.save();

    // Non-blocking: don't let email failures crash product creation
    try {
      await notifySubscribersNewProduct(product);
    } catch (emailErr) {
      console.log("EMAIL NOTIFICATION ERROR (non-blocking):", emailErr.message);
    }

    res.json(product);

  } catch (err) {
    console.log("ADD PRODUCT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


/* ================================
   UPDATE PRODUCT (ADMIN ONLY)
================================ */
 export const updateProduct = async (req, res) => {
  try {
    const images = req.files?.map(file => file.path) || [];

    /* ================= BUILD SAFE UPDATE DATA ================= */
    const updateData = {};

    Object.keys(req.body).forEach(key => {
      if (
        req.body[key] !== undefined &&
        req.body[key] !== "" &&
        req.body[key] !== "null"
      ) {
        updateData[key] = req.body[key];
      }
    });

    /* ================= PARSE JSON FIELDS ================= */
   /* ================= SAFE JSON PARSE ================= */
/* ================= SAFE JSON PARSE (BULLETPROOF) ================= */



/* ================= SAFE COLLECTIONS PARSE ================= */
if (updateData.collections) {
  let collections = [];

  // Case 1: JSON string
  if (typeof updateData.collections === "string") {
    if (updateData.collections === "[object Object]") {
      delete updateData.collections;
    } else {
      try {
        const parsed = JSON.parse(updateData.collections);
        if (Array.isArray(parsed)) {
          collections = parsed;
        }
      } catch {
        delete updateData.collections;
      }
    }
  }

  // Case 2: already array
  if (Array.isArray(updateData.collections)) {
    collections = updateData.collections;
  }

  // Normalize to ObjectId array
  if (collections.length > 0) {
    updateData.collections = collections
      .map(c => (typeof c === "object" ? c._id : c))
      .filter(id => mongoose.Types.ObjectId.isValid(id))
      .map(id => new mongoose.Types.ObjectId(id));
  } else {
    delete updateData.collections;
  }
}

/* ================= SAFE COLORS PARSE ================= */
if (updateData.colors) {
  let colors = [];

  // Case 1: JSON string
  if (typeof updateData.colors === "string") {
    if (updateData.colors === "[object Object]") {
      delete updateData.colors;
    } else {
      try {
        const parsed = JSON.parse(updateData.colors);
        if (Array.isArray(parsed)) {
          colors = parsed;
        }
      } catch {
        delete updateData.colors;
      }
    }
  }

  // Case 2: already array
  if (Array.isArray(updateData.colors)) {
    colors = updateData.colors;
  }

  // Validate color objects
  if (colors.length > 0) {
    updateData.colors = colors.filter(
      c => typeof c === "object" && c.name
    );
  } else {
    delete updateData.colors;
  }
}


    /* ================= FIX NUMBERS ================= */
    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.discountPrice) updateData.discountPrice = Number(updateData.discountPrice);
    if (updateData.stock) updateData.stock = Number(updateData.stock);

    /* ================= FIX BOOLEANS ================= */
    [
      "isDeleted",
      "isActive",
      "isTrending",
      "isCarousel",
      "isPremium",
      "isLimited",
    ].forEach(key => {
      if (updateData[key] !== undefined) {
        updateData[key] =
          updateData[key] === true ||
          updateData[key] === "true" ||
          updateData[key] === "on";
      }
    });

    /* ================= REBUILD DETAILS OBJECT ================= */
    if (
      updateData.fabric ||
      updateData.material ||
      updateData.care ||
      updateData.weight ||
      updateData.dimensions ||
      updateData.origin
    ) {
      updateData.details = {
        fabric: updateData.fabric,
        material: updateData.material,
        care: updateData.care,
        weight: updateData.weight,
        dimensions: updateData.dimensions,
        origin: updateData.origin,
      };

      delete updateData.fabric;
      delete updateData.material;
      delete updateData.care;
      delete updateData.weight;
      delete updateData.dimensions;
      delete updateData.origin;
    }

    /* ================= CLEAR CAROUSEL DATA IF UNCHECKED ================= */
    if (updateData.isCarousel === false) {
      updateData.carouselTitle = "";
      updateData.carouselSubtitle = "";
      updateData.carouselPriceText = "";
    }

    /* ================= IMAGES (SAFE REPLACE) ================= */
    if (images.length > 0 && updateData.colors?.length) {
      updateData.colors[0].images = images;
    }

    /* ================= IGNORE INVENTORY FROM FORM ================= */
if (updateData.inventory) {
  delete updateData.inventory;
}

    /* ================= UPDATE PRODUCT ================= */
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      product,
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



/* ================================
   DELETE PRODUCT (SOFT DELETE)
================================ */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/* ================================
   ADMIN PRODUCT TABLE
================================ */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false })
      .populate("category", "name")
      .populate("collections", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* ================================
   GET SINGLE PRODUCT
================================ */
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("collections", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* ================================
   FRONTEND PRODUCT LIST
================================ */
export const getProducts = async (req, res) => {
  try {
    let filter = { isDeleted: false };

    if (req.query.collection) {
      const collection = await Collection.findOne({
        slug: req.query.collection.toLowerCase()
      });

      if (collection) {
        filter.collections = collection._id;
      }
    }

    const products = await Product.find(filter)
      .populate("category", "name")
      .populate("collections", "name slug");

    res.json(products);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
