import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";

console.log("Auth middleware loaded");

// export default protect;
// export const protect = async (req, res, next) => {
//   console.log("---- PROTECT MIDDLEWARE HIT ----");
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Better way to check both collections
//     let account = await User.findById(decoded.id).select("-password");

//     if (!account) {
//       account = await Admin.findById(decoded.id).select("-password");
//     }

//     if (!account) {
//       console.log(`User ID ${decoded.id} not found in Database`); // Log this!
//       return res.status(401).json({ message: "Account not found" });
//     }

//     // Identify the role in logs for easier debugging
//     console.log(`AUTH SUCCESS: ${account.email} (${account.role || 'user'})`);

//     req.user = account;
//     next();
//   } catch (error) {
//     console.error("JWT ERROR:", error.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// export const protect = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     console.log("DECODED:", decoded);

//     const userId = decoded.id || decoded._id;

//     console.log("TYPE OF ID:", typeof userId);
//     console.log("USER ID:", userId);

//     let account = await User.findById(userId).select("-password");

//     if (!account) {
//       account = await Admin.findById(userId).select("-password");
//     }

//     if (!account) {
//       return res.status(401).json({ message: "Account not found" });
//     }

//     req.user = account;
//     next();
//   } catch (error) {
//     console.error("JWT ERROR:", error.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ ONLY USER
    const user = await User.findById(decoded.id || decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// export default protect;
