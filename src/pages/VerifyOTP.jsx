
import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./VerifyOTP.css";

export default function VerifyOTP() {
   
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Please enter the 6-digit OTP");
      return;
    }

    navigate("/safety-setup");
  };

  return (
    <main className="otp-page">
      <motion.section
        className="otp-card"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className="otp-back"
          onClick={() => navigate("/signup")}
          type="button"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="otp-icon">
          <ShieldCheck size={38} />
        </div>

        <h1>Verify Your Account</h1>
        <p className="otp-subtitle">
          Enter the 6-digit code sent to your phone number.
        </p>

        <form onSubmit={handleVerify}>
          <input
            className="otp-input"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="------"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            required
          />

          <button className="otp-verify" type="submit">
            Verify & Continue
          </button>
        </form>

        <p className="otp-resend">
          Didn’t receive the code? <button type="button" onClick={() => alert("Resend OTP backend se connect hoga.")}>Resend OTP</button>
        </p>
      </motion.section>
    </main>
  );
}