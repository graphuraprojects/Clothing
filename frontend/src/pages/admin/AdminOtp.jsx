import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminOtp = () => {
  const navigate = useNavigate();

  const [contact, setContact] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");

  const sendOtp = () => {
    if (!contact) {
      setError("Please enter email or mobile");
      return;
    }

    const fakeOtp = "123456"; // dummy OTP
    setGeneratedOtp(fakeOtp);
    setOtpSent(true);
    setError("");

    console.log("OTP (for demo):", fakeOtp);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      localStorage.setItem("graphura_admin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-2xl font-semibold text-[#2F2C79] mb-2">
          OTP Login
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your registered email or mobile number
        </p>

        {/* EMAIL / MOBILE */}
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Email or Mobile"
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />

        {/* SEND OTP */}
        {!otpSent && (
          <button
            onClick={sendOtp}
            className="w-full bg-[#2F2C79] text-white py-2 rounded-lg cursor-pointer"
          >
            Send OTP
          </button>
        )}

        {/* OTP INPUT */}
        {otpSent && (
          <>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6 digit OTP"
              className="w-full border rounded-lg px-4 py-2 mt-4"
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-black text-white py-2 rounded-lg mt-4 cursor-pointer"
            >
              Verify & Login
            </button>
          </>
        )}

        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}

        <p
          onClick={() => navigate("/admin/login")}
          className="text-xs mt-6 text-center text-gray-500 cursor-pointer"
        >
          Back to password login
        </p>
      </div>
    </div>
  );
};

export default AdminOtp;
