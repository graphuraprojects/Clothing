import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios.js";

import logo from "../../assets/logo/logo.webp";
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

    console.log("===== ADMIN LOGIN FORM SUBMITTED =====");
    console.log("SENDING POST to /admin/login with email:", email);

    try {
      const res = await axios.post(
        "/admin/login",
        { email, password },
       
      );

      console.log("LOGIN RESPONSE STATUS:", res.status);
      console.log("LOGIN RESPONSE DATA:", JSON.stringify(res.data));

      if (res.data.token) {
        localStorage.setItem("admin_token", res.data.token);
        localStorage.setItem("graphura_admin", "true");
        console.log("TOKEN SAVED, navigating to /admin/dashboard");
        navigate("/admin/dashboard");
      } else {
        console.log("NO TOKEN IN RESPONSE");
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("===== LOGIN REQUEST FAILED =====");
      console.error("ERROR STATUS:", err.response?.status);
      console.error("ERROR DATA:", JSON.stringify(err.response?.data));
      console.error("ERROR MESSAGE:", err.message);
      setError(
        err.response?.data?.message || "Server error. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .admin-login-center {
            min-height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
        }
      `}</style>

      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FAFAF7]">
        {/* LEFT IMAGE */}
        <div
          className="relative hidden md:flex h-screen w-full overflow-hidden items-center bg-cover bg-top"
          style={{ backgroundImage: `url(${userlogin})` }}
        >
          <div className="relative z-10 h-full w-full flex flex-col justify-between px-8 py-8 text-white">
            <div className="font-semibold tracking-wide">
              <img src={logo} alt="Graphura Logo" className="h-15 w-auto" />
            </div>

            <div>
              <h1 className="text-xl md:text-3xl font-serif font-semibold">
                Elegance is an attitude.
              </h1>
              <p className="mt-3 max-w-xs text-sm opacity-90">
                Join our exclusive community of curators and define your
                signature style.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT LOGIN CARD */}
        <div className="admin-login-center flex min-h-screen md:h-screen items-center justify-center px-4 sm:px-6 py-8 md:py-0 bg-[#FAFAF7]">
          <div
            className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl px-6 sm:px-8 py-8 sm:py-10"
            style={{ boxShadow: "0 16px 40px rgb(128, 128, 128)" }}
          >
            <h2 className="text-2xl font-semibold text-black">Admin Login</h2>
            <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>

            <form className="mt-6 space-y-4" onSubmit={handleLogin}>
              {/* EMAIL */}
              <div>
                <label className="text-xs font-medium tracking-wide text-gray-600">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="e.g. admin@graphura.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                  style={{
                    boxShadow: `
                      6px 6px 14px rgba(160,160,160,0.9),
                      -6px -6px 14px rgba(255,255,255,1),
                      inset 2px 2px 4px rgba(160,160,160,0.6),
                      inset -2px -2px 4px rgba(255,255,255,0.9)
                    `,
                  }}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-xs font-medium tracking-wide text-gray-600">
                  PASSWORD
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                  style={{
                    boxShadow: `
                      6px 6px 14px rgba(160,160,160,0.9),
                      -6px -6px 14px rgba(255,255,255,1),
                      inset 2px 2px 4px rgba(160,160,160,0.6),
                      inset -2px -2px 4px rgba(255,255,255,0.9)
                    `,
                  }}
                />
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-black text-white py-3 rounded-3xl text-sm font-medium hover:opacity-90 transition active:scale-95 disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Signing in..." : "SIGN IN"}
              </button>
            </form>

            {error && (
              <p className="mt-4 text-xs text-center text-red-500">{error}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
