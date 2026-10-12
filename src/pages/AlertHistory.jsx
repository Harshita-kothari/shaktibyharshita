import { t } from "../lib/i18n";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {

  ArrowLeft,

  Bell,

  ShieldCheck,

  Clock,

  ChevronRight,

  History } from

"lucide-react";

import "./AlertHistory.css";

import { api } from "../lib/api";



const AlertHistory = () => {

  const navigate = useNavigate();



  const [alerts, setAlerts] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {let alive = true,pending = false;const update = () => {if (pending) return;pending = true;api('/alerts').then((items) => {if (alive) {setAlerts(items);setError('');}}).catch((e) => {if (alive) setError(e.message);}).finally(() => {pending = false;if (alive) setLoading(false);});};update();const timer = setInterval(update, 5000);return () => {alive = false;clearInterval(timer);};}, []);



  return (

    <div className="history-page">

      <header className="history-header">

        <button

          className="history-back"

          onClick={() => navigate("/dashboard")}

          aria-label={t("Go back")}>

          

          <ArrowLeft size={22} />

        </button>



        <div>

          <h1>{t("Alert History")}</h1>

          <p>{t("Review your previous alerts")}</p>

        </div>

      </header>



      <main className="history-content"><p role="status">{t(error)}</p>

        <section className="history-summary">

          <div className="history-summary-icon">

            <History size={25} />

          </div>

          <div>

            <p>{t("Total recorded alerts")}</p>

            <h2>{t(alerts.length)}</h2>

          </div>

          <div className="history-summary-bell">

            <Bell size={25} />

          </div>

        </section>



        <div className="history-section-heading">

          <div>

            <h2>{t("Recent Activity")}</h2>

            <p>{t("Your recorded safety activity")}</p>

          </div>

          <span>{t(alerts.length)} {t("records")}</span>

        </div>



        {t(alerts.length === 0 ?

        <section className="history-empty">

            <div className="history-empty-icon">

              <Bell size={32} />

            </div>



            <h3>{t(loading ? "Loading alerts…" : error ? "Could not load alerts" : "No alerts yet")}</h3>

            <p>{t("SOS and overdue timer events appear here when you are signed in.")}



          </p>



            <button

            className="history-home-btn"

            onClick={() => navigate("/dashboard")}>{t("Back to Dashboard")}





            <ChevronRight size={18} />

            </button>

          </section> :



        <section className="history-list">

            {t(alerts.map((alert) =>

          <article className="history-item" key={alert.id}>

                <div className="history-item-icon">

                  <ShieldCheck size={21} />

                </div>



                <div className="history-item-info">

                  <h3>{t(alert.title || "Safety Alert")}</h3>

                  <p>{t(alert.description || "Alert activity recorded")}</p>

                  <span>

                    <Clock size={13} />

                    {t(alert.date ? new Date(alert.date).toLocaleString() : "Date unavailable")}

                  </span>

                </div>



                <span className="history-item-status">

                  {t(alert.status || "Recorded")}

                </span>

              </article>

          ))}

          </section>)

        }



        <div className="history-privacy">

          <ShieldCheck size={18} />

          <p>{t("This page reads events from your signed-in account. It does not show alerts sent to emergency services.")}





          </p>

        </div>

      </main>

    </div>);



};



export default AlertHistory;
