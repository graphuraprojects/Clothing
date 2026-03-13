import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import leftBlue from "../../assets/Login/userlogin.webp";
import logo from "../../assets/logo/logoWhite.webp";
import axios from "axios";
import { motion } from "framer-motion";

const AdminSignup = () => {
  const navigate = useNavigate();

  // ===== LOGIC (UNCHANGED) =====
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/admin/signup", { email, password });

      const token =
        res.data.token || res.data.admin?.token || res.data.data?.token;

      console.log("SIGNUP TOKEN:", token);

      if (token) {
        localStorage.setItem("admin_token", token);
        localStorage.setItem("graphura_admin", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Token not received from server");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Server error. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617]">
      {/* LEFT SECTION */}
      <div className="relative hidden md:flex h-screen w-full items-center justify-center overflow-hidden">
        <img
          src={leftBlue}
          alt="Signup Banner"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-60"
        />

        <div className="relative z-10 h-full w-full flex flex-col justify-between text-white px-8 py-8 ">
          <div>
            <img src={logo} alt="logo" className="h-12 mb-10" />
          </div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-3xl font-serif font-semibold leading-snug"
            >
              Elegance is <br /> an attitude.
            </motion.h1>

            <p className="mt-4 max-w-sm opacity-80">
              Join our exclusive admin community and manage your luxury
              collections with power and style.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIGNUP */}
      <div className="flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white text-center">
            Create Admin Account
          </h2>

          <p className="text-gray-300 text-center mt-2 text-sm">
            Join Graphura and manage luxury inventory
          </p>

          {error && (
            <p className="text-red-400 text-sm text-center mt-3">{error}</p>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSignup}>
            {/* EMAIL */}
            <div className="relative">
              <label className="text-xs text-gray-300 tracking-wide">
                EMAIL ADDRESS
              </label>

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs text-gray-300 tracking-wide">
                PASSWORD
              </label>

              <input
                type="password"
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-xs text-gray-300 tracking-wide">
                CONFIRM PASSWORD
              </label>

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full mt-1 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            {/* BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-3 rounded-xl text-white font-semibold tracking-wide shadow-lg hover:shadow-indigo-500/40 transition"
            >
              {loading ? "Signing up..." : "SIGN UP"}
            </motion.button>
          </form>

          {/* FOOTER */}
          <p className="mt-6 text-sm text-center text-gray-300">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/admin/login")}
              className="text-indigo-400 font-medium cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSignup;
