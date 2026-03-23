import Admin from "../models/admin.model.js";
import { generateToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

export const adminSignup = async (req, res) => {
  console.log("===== ADMIN SIGNUP HIT =====");
  console.log("REQ BODY:", JSON.stringify(req.body));
  try {
    const { email, password, secretKey } = req.body;
    console.log("SIGNUP EMAIL:", email);
    console.log("SIGNUP PASSWORD LENGTH:", password?.length);

    // Validate admin secret key
    const requiredSecretKey = process.env.ADMIN_SECRET_KEY;
    if (!requiredSecretKey) {
      console.log("SIGNUP ERROR: Admin secret key not configured on server");
      return res.status(500).json({ message: "Server configuration error" });
    }

    if (secretKey !== requiredSecretKey) {
      console.log("SIGNUP ERROR: Invalid secret key provided");
      return res.status(403).json({ message: "Invalid secret key" });
    }

    if (!email || !password) {
      console.log("SIGNUP ERROR: Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    const exists = await Admin.findOne({ email });
    console.log("ADMIN EXISTS CHECK:", !!exists);
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashed = await hashPassword(password);
    console.log("PASSWORD HASHED:", !!hashed);

    const admin = await Admin.create({
      email,
      password: hashed,
      role: "admin",
    });
    console.log("ADMIN CREATED:", admin._id, admin.email);

    const token = generateToken({
      id: admin._id,
      role: admin.role,
    });
    console.log("TOKEN GENERATED:", !!token);

    res.status(201).json({
      message: "Admin created",
      token,
    });
    console.log("SIGNUP RESPONSE SENT SUCCESSFULLY");
  } catch (err) {
    console.error("===== ADMIN SIGNUP ERROR =====", err.message, err.stack);
    res.status(500).json({ message: err.message });
  }
};

export const adminLogin = async (req, res) => {
  console.log("===== ADMIN LOGIN HIT =====");
  console.log("REQ BODY:", JSON.stringify(req.body));
  try {
    const { email, password } = req.body;
    console.log("LOGIN EMAIL:", email);
    console.log("LOGIN PASSWORD LENGTH:", password?.length);

    if (!email || !password) {
      console.log("LOGIN ERROR: Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    console.log("ADMIN FOUND:", !!admin);
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, admin.password);
    console.log("PASSWORD MATCH:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      id: admin._id,
      role: admin.role
    });
    console.log("TOKEN GENERATED:", !!token);

    res.json({
      message: "Login successful",
      token
    });
    console.log("LOGIN RESPONSE SENT SUCCESSFULLY");
  } catch (err) {
    console.error("===== ADMIN LOGIN ERROR =====", err.message, err.stack);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};



export const getAdminProfile = async (req, res) => {
 try {

  console.log("ADMIN USER:", req.user);   // TEMP DEBUG

  const admin = await Admin.findById(req.user._id || req.userId).select("-password");

  res.json(admin);

 } catch (err) {
  console.log("PROFILE ERROR:", err);
  res.status(500).json({ message: err.message });
 }
};


export const updateAdminEmail = async (req, res) => {
 try {

  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email required" });

  // Check if email belongs to another admin
  const exists = await Admin.findOne({
   email,
   _id: { $ne: req.user._id }
  });

  if (exists)
   return res.status(400).json({ message: "Email already in use" });

  const admin = await Admin.findByIdAndUpdate(
   req.user._id,
   { email },
   { new: true }
  );

  res.json({
   success: true,
   email: admin.email
  });

 } catch (err) {
  console.log("EMAIL UPDATE ERROR:", err);
  res.status(500).json({ message: err.message });
 }
};


export const updateAdminPassword = async (req, res) => {
 try {

  const { password } = req.body;

  if (!password) {
   return res.status(400).json({ message: "Password required" });
  }

  const hashed = await hashPassword(password);

  await Admin.findByIdAndUpdate(req.user._id, {
   password: hashed,
  });

  res.json({ success: true });

 } catch (err) {
  console.log("PASSWORD UPDATE ERROR:", err);
  res.status(500).json({ message: err.message });
 }
};

export const updateAdminAvatar = async (req, res) => {
 try {

  if (!req.file) {
   return res.status(400).json({ message: "No avatar uploaded" });
  }

  // Cloudinary gives secure URL here
  const avatar = req.file.path;

  const admin = await Admin.findByIdAndUpdate(
   req.user._id,
   { avatar },
   { new: true }
  ).select("-password");

  res.json({
   success: true,
   avatar: admin.avatar
  });

 } catch (err) {
  console.log("ADMIN AVATAR ERROR:", err);
  res.status(500).json({ message: err.message });
 }
};


