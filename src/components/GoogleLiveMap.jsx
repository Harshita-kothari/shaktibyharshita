import { t } from "../lib/i18n";
import { useState } from 'react';

// Free OpenStreetMap embed: no API key, no billing.
export default function GoogleLiveMap({ location }) {
  const [enabled, setEnabled] = useState(false);
  const lat = location?.latitude, lng = location?.longitude;
  const d = 0.004;
  const src = location
    ? 'https://www.openstreetmap.org/export/embed.html?bbox=' + [lng - d, lat - d, lng + d, lat + d].join('%2C') + '&layer=mapnik&marker=' + lat + '%2C' + lng
    : 'https://www.openstreetmap.org/export/embed.html?bbox=68%2C8%2C98%2C35&layer=mapnik';
  return <section className="google-live-map">
    {!enabled
      ? <div className="google-map-consent">
          <h2>{t("See your journey on the map")}</h2>
          <p>{t("OpenStreetMap will receive map requests and your displayed position. Enable the map only if you want to share it with OpenStreetMap.")}</p>
          <button className="shakti-primary" onClick={() => setEnabled(true)}>{t("Load Map")}</button>
        </div>
      : <>
          <iframe key={src} title={t("Live location map")} src={src} style={{ height: 340, width: '100%', border: 0 }} loading="lazy" referrerPolicy="no-referrer" />
          {!location && <p>{t("Map overview · Start location tracking to show your position.")}</p>}
        </>}
  </section>;
}
