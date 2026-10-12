import { t } from "../lib/i18n";import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { ArrowLeft, ShieldAlert, Phone, X, CheckCircle } from "lucide-react";

import HoldSOS from "../components/HoldSOS";
import AlertActions from "../components/AlertActions";

import "./SOS.css";

import { api, recordAlert } from "../lib/api";

import { useRef } from "react";



export default function SOS() {

  const navigate = useNavigate();

  const location = useLocation();

  const [stage, setStage] = useState(location.state?.heldSOS ? "countdown" : "ready");

  const [countdown, setCountdown] = useState(3);

  const [recordStatus, setRecordStatus] = useState("");

  const recorded = useRef(false);
  const [real, setReal] = useState(location.state?.realSOS !== false);
  const [pushStatus, setPushStatus] = useState("");
  const [sending, setSending] = useState(false);
  const sent = useRef(false);

  useEffect(() => {

    if (stage === "active" && !real && !recorded.current) {recorded.current = true;setRecordStatus("Recording SOS event…");recordAlert("sos").then(() => setRecordStatus("Demo event saved. Use the separate push or SMS actions to contact someone.")).catch((e) => setRecordStatus("Not recorded: " + e.message));}

    if (stage === "ready") recorded.current = false;

  }, [stage, real]);

  useEffect(() => {

    if (location.state?.heldSOS) window.history.replaceState({ ...window.history.state, usr: null }, "");

  }, [location.state]);

  useEffect(() => {

    if (stage !== "countdown") return;

    const end = Date.now() + 3000;

    const timer = setInterval(() => {

      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));

      setCountdown(left);

      if (left === 0) {clearInterval(timer);setStage("active");}

    }, 100);

    return () => clearInterval(timer);

  }, [stage]);

  useEffect(() => {if (stage !== "active" || !real || sent.current) return;sent.current = true;setSending(true);setPushStatus("Requesting real SOS push alerts…");api("/push/alert", { method: "POST", body: JSON.stringify({ kind: "sos" }) }).then((result) => setPushStatus(result.message)).catch((e) => setPushStatus("Alert request failed: " + e.message)).finally(() => setSending(false));}, [stage, real]);
  const markSafe = async () => {if (sending) return;if (real && sent.current) {setSending(true);try {const result = await api("/push/alert", { method: "POST", body: JSON.stringify({ kind: "safe" }) });setPushStatus("Safe update: " + result.message);setStage("safe");} catch (e) {setPushStatus("Safe update failed: " + e.message);} finally {setSending(false);}} else setStage("safe");};
  const begin = () => {setCountdown(3);setStage("countdown");};

  return <div className="sos-page">

    <header className="sos-header"><button className="sos-back" onClick={() => navigate("/dashboard")} aria-label={t("Back to dashboard")}><ArrowLeft size={22} /></button><div><h1>{t("Emergency SOS")}</h1><p>{t(real ? "Real push mode · connected contacts only" : "Demo mode · No alerts are sent")}</p></div></header>

    <main className="sos-content">

      <div className="sos-icon"><ShieldAlert size={34} /></div>

      {t(stage === "ready" && <><h2>{t("Help starts with one hold")}</h2><p className="sos-description">{t("Hold SOS for 3 seconds. After the short cancellation countdown, an alert request is sent automatically when real push mode is enabled.")}</p><label className="timer-demo"><input type="checkbox" checked={real} onChange={(e) => setReal(e.target.checked)} />{t("Send real push alerts to my connected safety circle after the countdown")}</label><HoldSOS real={real} onComplete={begin} /></>)}

      <div aria-live="polite" aria-atomic="true">

        {t(stage === "countdown" && <section className="sos-countdown-card"><span className="sos-status">{t(real ? "Real SOS starting" : "Demo SOS starting")}</span><h2>{t("Accidental hold? Cancel now.")}</h2><div className="sos-countdown">{t(countdown)}</div><p>{t(real ? "Connected contacts will receive an alert request when the countdown ends. Cancel now if accidental." : "No contacts or emergency services will be notified in this demo.")}</p><button className="sos-cancel-btn" onClick={() => setStage("cancelled")}><X size={19} />{t("Cancel SOS")}</button><button className="sos-start-btn sos-send-now" onClick={() => setStage("active")}>{t(real ? "Send alert now" : "Skip countdown · Start demo")}</button></section>)}

        {t(stage === "active" && <section className="sos-result-card"><CheckCircle size={42} /><h2>{t(real ? "SOS alert requested" : "SOS demo activated")}</h2><p>{t(real ? "Your alert request is processing. Check its status below. Use emergency calling or SMS if needed." : "The demo flow is complete. Separate push and SMS actions below are real.")}</p><button className="sos-start-btn" disabled={sending} onClick={markSafe}>{t(real ? "I’m safe · Notify my circle" : "I'm safe · End demo")}</button></section>)}

        {t((stage === "cancelled" || stage === "safe") && <section className="sos-result-card"><CheckCircle size={42} /><h2>{t(stage === "safe" ? real ? "Marked safe" : "Demo ended" : "SOS cancelled")}</h2><p>{t(real ? "Check the delivery status below." : "No emergency messages were sent.")}</p><button className="sos-start-btn" onClick={() => {sent.current = false;setStage("ready");setPushStatus("");}}>{t("Try again")}</button></section>)}

      </div>

      {t(stage === "active" && <AlertActions real={real} />)}
      <p className="sos-note" role="status">{t(pushStatus || recordStatus)}</p><p className="sos-note">{t("This app does not contact emergency services automatically. Real push alerts need connected devices and internet; use 112 when immediate help is needed.")}</p>

      <button className="sos-police-link" onClick={() => navigate("/police-help")}><Phone size={18} />{t("View emergency calling options")}</button>

    </main>

  </div>;

}
