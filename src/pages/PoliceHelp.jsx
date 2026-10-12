import { t } from "../lib/i18n";

import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  ShieldCheck,
  MapPin,
  AlertTriangle,
  MessageCircle } from
"lucide-react";
import "./PoliceHelp.css";

const PoliceHelp = () => {
  const navigate = useNavigate();

  return (
    <div className="police-page">
      <header className="police-header">
        <button
          className="police-back"
          onClick={() => navigate("/dashboard")}
          aria-label={t("Go back")}>
          
          <ArrowLeft size={22} />
        </button>

        <div>
          <h1>{t("Emergency Calling")}</h1>
          <p>{t("Emergency assistance")}</p>
        </div>
      </header>

      <main className="police-content">
        <section className="police-hero">
          <div className="police-hero-icon">
            <ShieldCheck size={34} />
          </div>
          <h2>{t("Need emergency help?")}</h2>
          <p>{t("If you are in immediate danger, contact local emergency services or a trusted person.")}


          </p>

          <a className="police-call-btn" href="tel:112">
            <Phone size={20} />{t("Call 112")}

          </a>

          <span className="police-caption">{t("Emergency helpline in India")}

          </span>
        </section>

        <section className="women-call-card"><div><h2>{t("Women Helpline")}</h2><p>{t("Support and assistance for women \xB7 India")}</p><small>{t("181 availability varies by state; use 112 for immediate emergency assistance.")}</small></div><a href="tel:181" className="police-call-btn"><Phone size={18} />{t("Call 181")}</a></section><section className="police-info-card">
          <div className="police-info-icon">
            <AlertTriangle size={21} />
          </div>
          <div>
            <h3>{t("Stay aware")}</h3>
            <p>{t("Move toward a safer, public place if possible and reach out to someone you trust.")}


            </p>
          </div>
        </section>

        <section className="police-options">
          <h2>{t("Quick assistance")}</h2>

          <button
            className="police-option"
            onClick={() => navigate("/live-location")}>
            
            <span className="option-icon">
              <MapPin size={21} />
            </span>
            <span className="option-text">
              <strong>{t("View my location")}</strong>
              <small>{t("Check your current location")}</small>
            </span>
            <span className="option-arrow">›</span>
          </button>

          <button
            className="police-option"
            onClick={() => navigate("/trusted-contacts")}>
            
            <span className="option-icon">
              <MessageCircle size={21} />
            </span>
            <span className="option-text">
              <strong>{t("Trusted contacts")}</strong>
              <small>{t("View your saved contacts")}</small>
            </span>
            <span className="option-arrow">›</span>
          </button>
        </section>

        <p className="police-disclaimer">{t("Shakti does not contact police or send your location automatically. The Call button opens your device's phone app, where you can confirm the call.")}



        </p>
      </main>
    </div>);

};

export default PoliceHelp;
