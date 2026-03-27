import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import API from "../../api/axios";
import { Loader2 } from "lucide-react";

import logo from "../../assets/logo/logoWhite.webp";
import userlogin from "../../assets/Login/userlogin.webp";

export default function UserSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/users/signup", {
        name,
        email,
        phone,
        password,
      });

      alert("Signup successful! Please login.");
      navigate("/user/login");
    } catch (err) {
      console.log("SIGNUP ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
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
                <img src={logo} alt="Graphura Logo" className="h-15 w-auto cursor-pointer" />
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

          {/* RIGHT FORM CARD */}
          <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 py-12 relative">
            {/* LOGIN CARD */}

            <div
              className="w-full max-w-md bg-[#FAF9F6] rounded-2xl px-8 py-6 shadow-[0_15px_40px_rgba(0,0,0,0.18)]"
              style={{
                boxShadow: "0 16px 40px rgb(128, 128, 128)",
              }}
            >
              <h2 className="text-2xl font-semibold mb-1">Create account</h2>
              <p className="text-sm text-gray-500 mb-6">
                Join Graphura and curate your luxury wardrobe.
              </p>

              <form onSubmit={handleSignup}>
                {/* FULL NAME */}
                <label className="text-xs tracking-widest text-gray-500">
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Akhil Jha"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full mt-1 mb-4 px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                />

                {/* EMAIL */}
                <label className="text-xs tracking-widest text-gray-500">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="e.g. vogue@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-1 mb-4 px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                />

                {/* PHONE */}
                <label className="text-xs tracking-widest text-gray-500">
                  PHONE NUMBER
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full mt-1 mb-4 px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                />

                {/* PASSWORD */}
                <label className="text-xs tracking-widest text-gray-500">
                  PASSWORD
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full mt-1 mb-6 px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                />

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-black text-white text-sm font-medium active:scale-95 transition cursor-pointer disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Creating account...</> : "SIGN UP"}
                </button>
              </form>

              {/* DIVIDER */}
              <div className="flex items-center my-5">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="px-3 text-xs text-gray-400">
                  OR CONTINUE WITH
                </span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* GOOGLE SIGNUP */}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const res = await API.post("/users/google", {
                        token: credentialResponse.credential,
                      });
                      localStorage.setItem("token", res.data.token);
                      navigate("/");
                    } catch {
                      alert("Google signup failed");
                    }
                  }}
                  onError={() => alert("Google signup failed")}
                />
              </div>

              <p className="text-xs text-center mt-5 text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-black font-medium cursor-pointer"
                >
                  SIGN IN
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}