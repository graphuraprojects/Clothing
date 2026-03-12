import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.webp";

export default function UserSignup() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen ">
      <div className="relative w-full h-full bg-[#F7F4EF] shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* LEFT IMAGE  */}
          <div
            className="hidden md:block md:w-1/2 relative bg-cover bg-top"
            style={{ backgroundImage: "url(/images/userlogin.webp)" }}
          >
            <div className="relative z-10 h-full w-full flex flex-col justify-between px-8 py-8 text-white">
              <div className="font-semibold tracking-wide">
                <img src={logo} alt="Graphura Logo" className="h-15 w-auto" />
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

              {/* FULL NAME */}
              <label className="text-xs tracking-widest text-gray-500">
                FULL NAME
              </label>
              <input
                type="text"
                placeholder="e.g. Akhil Jha"
                className="w-full mt-1 mb-4 px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                style={{
                  boxShadow: `
                    6px 6px 14px rgba(160,160,160,0.9),
                    -6px -6px 14px rgba(255,255,255,1),
                    inset 2px 2px 4px rgba(160,160,160,0.6),
                    inset -2px -2px 4px rgba(255,255,255,0.9)
                  `,
                }}
              />

              {/* EMAIL */}
              <label className="text-xs tracking-widest text-gray-500">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                placeholder="e.g. vogue@example.com"
                className="w-full mt-1 mb-4 px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                style={{
                  boxShadow: `
                    6px 6px 14px rgba(160,160,160,0.9),
                    -6px -6px 14px rgba(255,255,255,1),
                    inset 2px 2px 4px rgba(160,160,160,0.6),
                    inset -2px -2px 4px rgba(255,255,255,0.9)
                  `,
                }}
              />

              {/* PASSWORD */}
              <label className="text-xs tracking-widest text-gray-500">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 mb-6 px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                style={{
                  boxShadow: `
                    6px 6px 14px rgba(160,160,160,0.9),
                    -6px -6px 14px rgba(255,255,255,1),
                    inset 2px 2px 4px rgba(160,160,160,0.6),
                    inset -2px -2px 4px rgba(255,255,255,0.9)
                  `,
                }}
              />

              {/* BUTTON */}
              <button className="w-full py-3 rounded-full bg-black text-white text-sm font-medium active:scale-95 transition cursor-pointer">
                SIGN UP
              </button>

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
