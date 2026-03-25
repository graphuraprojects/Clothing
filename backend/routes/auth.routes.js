import express from "express";
import { signup, login ,googleLogin,updateProfile } from "../controllers/auth.controller.js";
import {protect}  from "../middlewares/auth.middleware.js";
import { getMe } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleLogin);
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);


// Example protected route
// router.get("/profile", protect, (req, res) => {
//   res.json({
//     message: "User profile",
//     user: req.user
//   });
// });

// router.get("/verify", protect, (req,res)=>{
//  res.json({
//   success:true,
//   user:req.user
//  });
// });


export default router;
