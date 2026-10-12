import { t } from "../lib/i18n";import GoogleLiveMap from '../components/GoogleLiveMap';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Navigation, ShieldCheck, LocateFixed, Lock, Copy, Share2, Square } from "lucide-react";
import "./LiveLocation.css";
import { api } from "../lib/api";

export default function LiveLocation() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [liveToken, setLiveToken] = useState(null);
  const liveRef = useRef(null);
  const [liveError, setLiveError] = useState("");
  const [sharingBusy, setSharingBusy] = useState(false);
  const sharingGeneration=useRef(0);
  const mounted=useRef(true);
  useEffect(() => {if (!liveToken || !location) return;api("/tracking/" + liveToken, { method: "PUT", body: JSON.stringify(location) }).catch((e) => setLiveError("Live update failed: " + e.message));}, [location, liveToken]);
  useEffect(()=>{mounted.current=true;const sessionGeneration=sharingGeneration;return()=>{mounted.current=false;sessionGeneration.current++;if(liveRef.current)fetch("/api/tracking/"+liveRef.current,{method:"DELETE",keepalive:true}).catch(()=>{});};},[]);
  const beginSharing = async () => {
    if(sharingBusy||liveRef.current)return;
    const generation=++sharingGeneration.current;setSharingBusy(true);setLiveError('');
    try{const result=await api('/tracking',{method:'POST'});
      if(!mounted.current||generation!==sharingGeneration.current){await api('/tracking/'+result.token,{method:'DELETE'});return;}
      liveRef.current=result.token;setLiveToken(result.token);
    }catch(e){if(mounted.current)setLiveError(e.message);}finally{if(mounted.current)setSharingBusy(false);}
  };
  const endSharing = async () => {
    sharingGeneration.current++;const token=liveRef.current;if(!token)return;
    try{await api('/tracking/'+token,{method:'DELETE'});if(liveRef.current===token){liveRef.current=null;setLiveToken(null);}setLiveError('Live link revoked.');}
    catch(e){setLiveError('Could not revoke live link: '+e.message);}
  };
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [, setElapsed] = useState(0);
  const watch = useRef(null);
  const generation = useRef(0);
  const timeout = useRef(null);
  const started = useRef(null);
  const clearWatch = () => {
    if (watch.current !== null) navigator.geolocation?.clearWatch(watch.current);
    watch.current = null;
    clearTimeout(timeout.current);
  };
  useEffect(() => () => {generation.current++;clearWatch();}, []);
  useEffect(() => {
    if (status !== "tracking") return;
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - started.current) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [status]);
  const stop = () => {endSharing();generation.current++;clearWatch();setStatus("stopped");setNotice("Tracking stopped. Live link revocation was requested; snapshot map links retain the previously shared position.");};
  const start = () => {
    if(liveRef.current){setError("Revoke the existing live link before restarting location.");return;}clearWatch();const token = ++generation.current;
    setError("");setNotice("");setLocation(null);setElapsed(0);
    if (!navigator.geolocation) {setError("Location is not supported in this browser.");setStatus("error");return;}
    setStatus("locating");
    const failed = (reason) => {
      if (token !== generation.current) return;
      generation.current++;clearWatch();setStatus("error");
      setError(reason.code === 1 ? "Permission denied. Allow location in your browser settings, then retry." : reason.code === 3 ? "Location timed out. On Windows, turn on Settings > Privacy & security > Location > Location services. If this preview stays blocked, open this URL in Chrome or Edge and allow location." : "Location unavailable. Check device location settings and try again.");
    };
    timeout.current = setTimeout(() => failed({ code: 3 }), 25000);
    watch.current = navigator.geolocation.watchPosition((position) => {
      if (token !== generation.current) return;
      clearTimeout(timeout.current);
      if (!started.current) started.current = Date.now();
      setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy, time: position.timestamp });
      setStatus("tracking");
    }, failed, { enableHighAccuracy: false, timeout: 15000, maximumAge: 30000 });
    started.current = null;
  };
  const url = location ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}` : "";
  const share = async () => {
    setNotice("");
    try {
      if (navigator.share) {await navigator.share({ title: "My location · Shakti", text: "My location at " + new Date(location.time).toLocaleTimeString() + ". This is a snapshot, not live tracking.", url });setNotice("Share sheet closed. Delivery is not confirmed by this app.");} else
      {await navigator.clipboard.writeText(url);setNotice("Map link copied. Paste it into a message to your trusted contact.");}
    } catch (e) {if (e.name !== "AbortError") setNotice("Sharing unavailable. Use the map link below.");}
  };
  const copy = async () => {try {await navigator.clipboard.writeText(url);setNotice("Snapshot link copied. It will not update when you move.");} catch {setNotice("Copy unavailable. Select and copy the map link below.");}};
  const running = status === "tracking" || status === "locating";
  return <div className="live-location-page">
    <header className="location-header"><button className="location-back" onClick={() => navigate("/dashboard")} aria-label={t("Back to dashboard")}><ArrowLeft size={22} /></button><div><h1>{t("Live Location")}</h1><p>{t("Your journey, under your control")}</p></div><div className="location-header-icon"><MapPin size={22} /></div></header>
    <main className="location-content">
      <GoogleLiveMap location={location} />
      <section className="location-info-card"><div className="location-info-heading"><div className="location-info-icon"><Navigation size={21} /></div><div><h2>{t("Current Location")}</h2><p>{t(location ? `Last update: ${new Date(location.time).toLocaleTimeString()}` : "Location has not been accessed")}</p></div></div>
        {t(location && <div className="coordinates-box"><p><strong>{t("Latitude:")}</strong> {t(location.latitude.toFixed(6))}</p><p><strong>{t("Longitude:")}</strong> {t(location.longitude.toFixed(6))}</p><p><strong>{t("Accuracy:")}</strong> {t("approximately")} {t(Math.round(location.accuracy))} {t("metres")}</p><a href={url} target="_blank" rel="noreferrer" className="map-link">{t("View on Google Maps")}</a><div className="location-share-actions"><button onClick={share}><Share2 size={17} />{t("Share snapshot")}</button><button onClick={copy}><Copy size={17} />{t("Copy link")}</button></div><input aria-label={t("Location snapshot link")} readOnly value={url} className="location-url" /></div>)}
        {t(status === "locating" && <p className="location-notice">{t("Allow location in the browser popup. If no popup appears, try this page in Chrome or Edge. Windows Location services must be turned on.")}</p>)} {t(error && <p className="location-error" role="alert">{t(error)}</p>)}
        <p className="location-notice" role="status">{t(notice)}</p>
        {t((liveToken || location && status === "tracking") && <div className="coordinates-box"><h3>{t("Live sharing link")}</h3><p>{t("Enable to upload your position to this server. Anyone with the link can view updates for up to 1 hour. Keep this page open.")}</p>{t(liveToken ? <><input className="location-url" aria-label={t("Live tracking link")} readOnly value={window.location.origin + "/track/" + liveToken} /><p>{t("Copy this link to share. Localhost links only work on this computer; public HTTPS hosting is required for contacts on other devices.")}</p><button className="get-location-btn" onClick={endSharing}>{t("Revoke live link")}</button></> : <button className="get-location-btn" disabled={sharingBusy} onClick={beginSharing}>{t(sharingBusy ? "Creating link…" : "Enable live sharing")}</button>)}<p role="status">{t(liveError)}</p></div>)}
        <button className="get-location-btn" onClick={running ? stop : start}>{t(running ? <Square size={18} /> : <LocateFixed size={19} />)} {t(status === "locating" ? "Cancel location request" : status === "tracking" ? "Stop tracking" : "Start location tracking")}</button>
      </section>
      <nav className="location-quick-nav" aria-label={t("Safety pages")}><button onClick={() => navigate("/dashboard")}>{t("Home dashboard")}</button><button onClick={() => navigate("/trusted-contacts")}>{t("Trusted contacts")}</button><button onClick={() => navigate("/police-help")}>{t("Emergency calling")}</button></nav><section className="privacy-card"><div className="privacy-icon"><Lock size={20} /></div><div><h3>{t("You decide what to share")}</h3><p>{t("Location updates stay on this page until you enable Google Map, share a snapshot, or enable live sharing. The enabled map sends your displayed position to Google. Shared links show one position; live links update while this page is open and sharing is enabled. Tracking stops when you leave this page and may pause in the background.")}</p></div></section>
      <div className="location-safety-note"><ShieldCheck size={18} /><span>{t("No automatic contact alerts are sent")}</span></div>
    </main>
  </div>;
}
