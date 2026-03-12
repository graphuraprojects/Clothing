import { useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from "../../assets/logo/logo.webp";
import { GoogleLogin } from "@react-oauth/google";
import API from "../../api/axios";
import userlogin from "../../assets/Login/userlogin.webp";

export default function UserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="relative w-full h-full bg-[#F7F4EF] shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">

          {/* LEFT IMAGE */}
          <div
            className="hidden md:block md:w-1/2 relative bg-cover bg-top"
            style={{ backgroundImage: `url(${userlogin})` }}
          >
            <div className="relative z-10 h-full w-full flex flex-col justify-between px-8 py-8 text-white">
              <div className="font-semibold tracking-wide">
                <img src={logo} alt="Graphura Logo" className="h-15 w-auto cursor-pointer" onClick={() => navigate("/")} />
              </div>

              <div>
                <h1 className="text-xl md:text-3xl font-serif font-semibold">
                  Luxury that speaks for you.
                </h1>
                <p className="mt-3 max-w-xs text-sm opacity-90">
                  Thoughtfully curated fashion for those who appreciate detail,
                  confidence, and timeless design made to complement who you
                  are, not overpower it.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 py-12 relative">
            <div
              className="w-full max-w-md bg-[#FAF9F6] rounded-2xl px-8 py-6 shadow-[0_15px_40px_rgba(0,0,0,0.18)]"
              style={{ boxShadow: "0 16px 40px rgb(128, 128, 128)" }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                Welcome back
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Sign in to your curated wardrobe
              </p>

              <form onSubmit={handleLogin}>
                <label className="text-xs font-medium tracking-wide text-gray-600">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="e.g. vogue@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-1 mb-3 px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                />

                <div className="flex justify-between items-center">
                  <label className="text-xs pt-5 pb-2 font-medium tracking-wide text-gray-600">
                    PASSWORD
                  </label>
                  <span className="text-xs text-[#C6A75E] pt-5 pb-2 cursor-pointer">
                    Forgot?
                  </span>
                </div>

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full mt-1 mb-3 px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#000000] text-white py-3 rounded-xl tracking-wide hover:opacity-90 active:scale-95 transition cursor-pointer"
                >
                  {loading ? "Signing in..." : "SIGN IN"}
                </button>
              </form>

              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="px-3 text-xs text-gray-400">
                  OR CONTINUE WITH
                </span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              <div className="flex justify-center gap-8 mt-4">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const res = await API.post("/users/google", {
                        token: credentialResponse.credential,
                      });
                      localStorage.setItem("token", res.data.token);
                      navigate("/");
                    } catch {
                      alert("Google login failed");
                    }
                  }}
                  onError={() => alert("Google Login Failed")}
                />
              </div>

              <p className="text-sm text-center mt-4 text-gray-600">
                Don’t have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="font-medium text-[#2E2B7B] cursor-pointer" 
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}