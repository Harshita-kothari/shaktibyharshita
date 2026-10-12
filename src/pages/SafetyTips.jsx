import { t } from "../lib/i18n";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Phone,
  Users,
  Car,

  ChevronDown,
  ChevronUp } from
"lucide-react";
import "./SafetyTips.css";

const safetyTips = [
{
  category: "Travel Safety",
  icon: Car,
  tips: [
  {
    title: "Share your journey",
    description:
    "Travel karte waqt apni destination aur expected arrival time trusted person ko batao."
  },
  {
    title: "Stay aware of your surroundings",
    description:
    "Public places mein surroundings par dhyan do aur zarurat padne par safe, populated area mein jao."
  },
  {
    title: "Plan your route",
    description:
    "Nikalne se pehle route check karo aur possible ho to well-lit, busy routes choose karo."
  }]

},
{
  category: "Online Safety",
  icon: ShieldCheck,
  tips: [
  {
    title: "Protect personal information",
    description:
    "Apna home address, live location, passwords ya personal details unknown people ke saath share mat karo."
  },
  {
    title: "Check location permissions",
    description:
    "Apps ko location access sirf tab do jab zarurat ho. Apni location-sharing settings regularly check karo."
  },
  {
    title: "Be careful with unknown links",
    description:
    "Unknown messages aur suspicious links ko open karne se pehle verify karo."
  }]

},
{
  category: "Emergency Preparedness",
  icon: Phone,
  tips: [
  {
    title: "Keep emergency contacts ready",
    description:
    "Trusted contacts ko phone mein save rakho aur unhe batao ki emergency mein kaise contact karna hai."
  },
  {
    title: "Know your local emergency number",
    description:
    "India mein emergency assistance ke liye 112 dial kiya ja sakta hai."
  },
  {
    title: "Use SOS thoughtfully",
    description:
    "SOS feature use karne se pehle samjho ki app kya information share karega aur kisko alert milega."
  }]

},
{
  category: "Personal Safety",
  icon: Users,
  tips: [
  {
    title: "Trust your instincts",
    description:
    "Agar kisi situation mein uncomfortable feel ho, to safe jagah par jao aur trusted person se help lo."
  },
  {
    title: "Stay connected",
    description:
    "Late travel ya unfamiliar place par kisi trusted person ko apne plans ke baare mein update kar sakte ho."
  },
  {
    title: "Identify safe places",
    description:
    "Apne aas-paas ke staffed public places, security desks ya help points ko identify karna useful ho sakta hai."
  }]

}];


const SafetyTips = () => {
  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = useState("Travel Safety");

  const toggleCategory = (category) => {
    setOpenCategory((current) =>
    current === category ? null : category
    );
  };

  return (
    <div className="safety-tips-page">
      <header className="tips-header">
        <button
          className="tips-back-btn"
          onClick={() => navigate("/dashboard")}
          aria-label={t("Back to dashboard")}>
          
          <ArrowLeft size={20} />
        </button>

        <div>
          <p className="tips-eyebrow">{t("RAKSHANOW")}</p>
          <h1>{t("Safety Tips")}</h1>
          <p className="tips-subtitle">{t("Simple habits to help you stay prepared.")}

          </p>
        </div>
      </header>

      <section className="tips-banner">
        <div className="tips-banner-icon">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h2>{t("Your safety matters")}</h2>
          <p>{t("Stay aware, plan ahead, and reach out to someone you trust whenever you need support.")}


          </p>
        </div>
      </section>

      <section className="tips-section">
        <div className="tips-section-heading">
          <div>
            <h2>{t("Explore safety guides")}</h2>
            <p>{t("Choose a category to read its tips.")}</p>
          </div>
          <span>{t(safetyTips.length)} {t("guides")}</span>
        </div>

        <div className="tips-categories">
          {t(safetyTips.map((section) => {
            const Icon = section.icon;
            const isOpen = openCategory === section.category;

            return (
              <article className="tips-category" key={section.category}>
                <button
                  className="tips-category-btn"
                  onClick={() => toggleCategory(section.category)}
                  aria-expanded={isOpen}>
                  
                  <span className="tips-category-icon">
                    <Icon size={22} />
                  </span>

                  <span className="tips-category-name">
                    {t(section.category)}
                    <small>{t(section.tips.length)} {t("helpful tips")}</small>
                  </span>

                  {t(isOpen ?
                  <ChevronUp size={21} /> :

                  <ChevronDown size={21} />)
                  }
                </button>

                {t(isOpen &&
                <div className="tips-list">
                    {t(section.tips.map((tip, index) =>
                  <div className="tips-item" key={tip.title}>
                        <span className="tips-number">
                          {t(String(index + 1).padStart(2, "0"))}
                        </span>
                        <div>
                          <h3>{t(tip.title)}</h3>
                          <p>{t(tip.description)}</p>
                        </div>
                      </div>
                  ))}
                  </div>)
                }
              </article>);

          }))}
        </div>
      </section>

      <section className="tips-emergency-card">
        <div className="tips-emergency-icon">
          <Phone size={22} />
        </div>
        <div className="tips-emergency-content">
          <h2>{t("Need emergency assistance?")}</h2>
          <p>{t("In India, call 112 for emergency assistance when needed.")}

          </p>
          <button onClick={() => navigate("/police-help")}>{t("Open Police Help")}

          </button>
        </div>
      </section>

      <div className="tips-footer-note">
        <MapPin size={16} />
        <p>{t("These tips are general guidance and cannot guarantee safety in every situation.")}


        </p>
      </div>
    </div>);

};

export default SafetyTips;
