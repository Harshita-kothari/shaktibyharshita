import { t } from "../lib/i18n";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  MapPin,
  Users,
  Bell,
  ArrowRight,
  LockKeyhole } from
"lucide-react";
import "./SafetySetup.css";

export default function SafetySetup() {
  const navigate = useNavigate();

  const handleSetup = () => {
    navigate("/trusted-contacts?setup=1");
  };

  return (
    <main className="safety-setup-page">
      <motion.section
        className="safety-setup-card"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        
        <div className="setup-icon">
          <ShieldCheck size={38} />
        </div>

        <h1>{t("Set Up Your Safety")}</h1>
        <p className="setup-subtitle">{t("A few steps to personalize your safety experience.")}

        </p>

        <div className="setup-options">
          <button type="button" className="setup-option" onClick={() => navigate("/live-location")}>
            <div className="setup-option-icon">
              <MapPin size={22} />
            </div>
            <div className="setup-option-text">
              <h3>{t("Location Sharing")}</h3>
              <p>{t("Choose when to share your live location.")}</p>
            </div>
            <span className="setup-badge">{t("Optional")}</span>
          </button>

          <button type="button" className="setup-option" onClick={() => navigate("/trusted-contacts")}>
            <div className="setup-option-icon">
              <Users size={22} />
            </div>
            <div className="setup-option-text">
              <h3>{t("Trusted Contacts")}</h3>
              <p>{t("Review the people you want to contact in an emergency.")}</p>
            </div>
            <span className="setup-badge">{t("Optional")}</span>
          </button>

          <button type="button" className="setup-option" onClick={() => navigate("/push-setup")}>
            <div className="setup-option-icon">
              <Bell size={22} />
            </div>
            <div className="setup-option-text">
              <h3>{t("Safety Alerts")}</h3>
              <p>{t("Set up alerts for your safety activities.")}</p>
            </div>
            <span className="setup-badge">{t("Optional")}</span>
          </button>
        </div>

        <div className="setup-privacy">
          <LockKeyhole size={17} />
          <p>{t("Your location and personal information should only be shared with your permission.")}


          </p>
        </div>

        <button className="setup-continue" onClick={handleSetup}>{t("Set Up My Safety")}
          <ArrowRight size={18} />
        </button>

        <button
          className="setup-skip"
          onClick={() => navigate("/dashboard")}>{t("Set up later")}


        </button>
      </motion.section>
    </main>);

}
