import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import logo from "../../assets/logo/logoWhite.webp";
import userlogin from "../../assets/Login/userlogin.webp";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/admin/login",
        { email, password }
      );

      if (res.data.token) {
        localStorage.setItem("admin_token", res.data.token);
        localStorage.setItem("graphura_admin", "true");
        navigate("/admin/dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617]">

      {/* LEFT SIDE */}
      <div className="relative hidden md:flex h-screen w-full items-center justify-center overflow-hidden">
        <img
          src={userlogin}
          alt="Login Banner"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-60"
        />

        <div className="relative z-10 h-full w-full flex flex-col justify-between px-8 py-8 text-white">

          {/* LOGO */}
          <div>
            <img
              src={logo}
              alt="Graphura Logo"
              className="h-12 mb-10"
            />
          </div>

          {/* TEXT */}
          <div>
            <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-3xl font-serif font-semibold leading-snug">
              Elegance is <br />
               an attitude.
            </motion.h1>

            <p className="mt-4 max-w-sm opacity-80">
              Join our exclusive community of curators and define your signature style.
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="flex items-center justify-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white text-center">
            Admin Login
          </h2>

          <p className="text-gray-300 text-center mt-2 text-sm">
            Sign in to manage Graphura dashboard
          </p>

          {error && (
            <p className="text-red-400 text-sm text-center mt-3">{error}</p>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>

            {/* EMAIL */}
            <div>
              <label className="text-xs text-gray-300 tracking-wide">
                EMAIL ADDRESS
              </label>

              <input
                type="email"
                placeholder="admin@graphura.com"
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            {/* LOGIN BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-3 rounded-xl text-white font-semibold tracking-wide shadow-lg hover:shadow-indigo-500/40 transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </motion.button>

          </form>

          <p className="mt-6 text-sm text-center text-gray-300">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/admin/signup")}
              className="text-indigo-400 font-medium cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>

        </motion.div>

      </div>
    </div>
  );
};

export default AdminLogin;