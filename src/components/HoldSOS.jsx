import { t } from "../lib/i18n";import { useEffect, useRef, useState } from "react";
import "./HoldSOS.css";

export default function HoldSOS({ onComplete, real = false }) {
  const [progress, setProgress] = useState(0);
  const started = useRef(null);
  const frame = useRef(null);
  const completed = useRef(false);
  const stop = () => {
    cancelAnimationFrame(frame.current);
    started.current = null;
    setProgress(0);
  };
  useEffect(() => {
    const abort = () => {cancelAnimationFrame(frame.current);started.current = null;setProgress(0);};
    window.addEventListener("blur", abort);
    document.addEventListener("visibilitychange", abort);
    return () => {cancelAnimationFrame(frame.current);window.removeEventListener("blur", abort);document.removeEventListener("visibilitychange", abort);};
  }, []);
  const start = () => {
    if (started.current !== null || completed.current) return;
    started.current = performance.now();
    const tick = (now) => {
      const value = Math.min((now - started.current) / 3000, 1);
      setProgress(value);
      if (value === 1) {completed.current = true;started.current = null;onComplete();} else
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };
  return <div className="hold-sos-wrap">
    <button className={`hold-sos ${progress > 0 ? "holding" : ""}`} style={{ "--hold-angle": `${progress * 360}deg` }}
    aria-label={t(real ? "Hold SOS for 3 seconds to alert connected contacts" : "Hold SOS for 3 seconds to start demo")} aria-describedby="hold-sos-help"
    onPointerDown={(e) => {if (e.button !== 0) return;e.currentTarget.setPointerCapture(e.pointerId);start();}}
    onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop} onContextMenu={(e) => e.preventDefault()}
    onKeyDown={(e) => {if ([" ", "Enter"].includes(e.key)) {e.preventDefault();if (!e.repeat) start();}}}
    onKeyUp={(e) => {if ([" ", "Enter"].includes(e.key)) {e.preventDefault();stop();}}} onBlur={stop}>
      <span className="hold-sos-inner"><strong>{t("SOS")}</strong><small>{t(progress > 0 ? `${Math.max(1, Math.ceil(3 - progress * 3))}s · keep holding` : "Hold for 3 seconds")}</small></span>
    </button>
    <p id="hold-sos-help">{t("Release early to cancel \xB7 Keyboard: hold Space or Enter")}</p>
  </div>;
}
