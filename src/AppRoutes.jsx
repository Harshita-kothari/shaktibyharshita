
import { lazy, Suspense } from "react";
const PoliceHelp = lazy(()=>import("./pages/PoliceHelp"));
const SafetySetup = lazy(()=>import("./pages/SafetySetup.jsx"));
const LiveLocation = lazy(()=>import("./pages/LiveLocation.jsx"));

const SOS = lazy(()=>import("./pages/SOS"));
import { BrowserRouter, Routes, Route } from "react-router-dom";
const SafetyTips = lazy(()=>import("./pages/SafetyTips"));
const Settings = lazy(()=>import("./pages/Settings"));
import "./index.css";
import App from "./App.jsx";
const PushSetup = lazy(()=>import("./pages/PushSetup.jsx"));
const Track = lazy(()=>import("./pages/Track.jsx"));
const Auth = lazy(()=>import("./pages/Auth.jsx"));
const FakeCall = lazy(()=>import("./pages/FakeCall.jsx"));
const SafetyTimer = lazy(()=>import("./pages/SafetyTimer.jsx"));
const AlertHistory = lazy(()=>import("./pages/AlertHistory"));
const Journey = lazy(()=>import("./pages/Journey"));
const Profile = lazy(()=>import("./pages/Profile"));
const TrustedContacts = lazy(()=>import("./pages/TrustedContacts.jsx"));
const Dashboard = lazy(()=>import("./pages/ShaktiHome.jsx"));
const VoiceSOS = lazy(()=>import("./pages/VoiceSOS.jsx"));
const Evidence = lazy(()=>import("./pages/Evidence.jsx"));
const NearbyHelp = lazy(()=>import("./pages/NearbyHelp.jsx"));
const Onboarding = lazy(()=>import("./pages/Onboarding.jsx"));
const FeatureScreen = lazy(()=>import("./pages/FeatureScreen.jsx"));
import LanguageRoot from "./components/LanguageRoot";
const Language = lazy(()=>import("./pages/Language"));
const AccountRecovery = lazy(()=>import("./pages/AccountRecovery"));
const SMSFallback = lazy(()=>import("./pages/SMSFallback"));
import {t} from "./lib/i18n";
import "./shakti.css";

try { document.documentElement.dataset.theme = localStorage.getItem("rakshaTheme") === "dark" ? "dark" : "light"; } catch { document.documentElement.dataset.theme = "light"; }

export default function AppRoutes(){return (
    <LanguageRoot><BrowserRouter>
      <Suspense fallback={<p role="status">{t("Loading…")}</p>}><Routes>
<Route path="/language" element={<Language/>}/>
<Route path="/forgot-password" element={<AccountRecovery/>}/>
<Route path="/reset-password" element={<AccountRecovery reset/>}/>
<Route path="/account-recovery" element={<AccountRecovery manage/>}/>
<Route path="/sms-fallback" element={<SMSFallback/>}/>
<Route path="*" element={<main className="shakti-feature"><h1>{t("Page not found")}</h1><a href="/dashboard">{t("Go to dashboard")}</a></main>}/>
<Route path="/voice-sos" element={<VoiceSOS/>}/>
<Route path="/record" element={<Evidence/>}/>
<Route path="/nearby-help" element={<NearbyHelp/>}/>
<Route path="/onboarding" element={<Onboarding/>}/>{["safe-route","community-alerts","report"].map(path=><Route key={path} path={"/"+path} element={<FeatureScreen key={path} kind={path}/>}/>)}
        <Route path="/safety-timer" element={<SafetyTimer />} />
        <Route path="/fake-call" element={<FakeCall />} />
        <Route path="/track/:token" element={<Track />} />
        <Route path="/push-setup" element={<PushSetup />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/safety-tips" element={<SafetyTips />} />
        <Route path="/alert-history" element={<AlertHistory />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/police-help" element={<PoliceHelp />} />
        <Route path="/live-location" element={<LiveLocation />} />
        <Route path="/trusted-contacts" element={<TrustedContacts />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/safety-setup" element={<SafetySetup />} />
        <Route path="/verify-otp" element={<Auth />} />
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Auth register />} /><Route path="/login" element={<Auth />} />
      </Routes></Suspense>
    </BrowserRouter></LanguageRoot>
  );}





