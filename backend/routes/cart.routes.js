import express from "express";
import {protect} from "../middlewares/auth.middleware.js";

import {
 addToCart,
 updateCart,
 removeFromCart,
 toggleWishlist
} from "../controllers/cart.controller.js";

const router=express.Router();
console.log("🔥 CART ROUTES FILE LOADED");

router.post("/",protect,addToCart);
router.put("/:id",protect,updateCart);
router.delete("/:id",protect,removeFromCart);
router.post("/wishlist/:id",protect,toggleWishlist);

export default router;
