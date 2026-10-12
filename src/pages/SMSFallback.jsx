import { t } from "../lib/i18n";import { useNavigate } from 'react-router-dom';
import AlertActions from '../components/AlertActions';
export default function SMSFallback() {const nav = useNavigate();return <main className="shakti-feature"><header><button onClick={() => nav('/dashboard')} aria-label={t("Back to dashboard")}>←</button><h1>{t("SMS Fallback")}</h1></header><AlertActions smsOnly /></main>;}
