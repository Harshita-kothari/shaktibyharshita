# RakshaNow local full-stack application

Run with Node.js 22.23 or newer.

Terminal 1 (from rakshanow): `node backend/server.js`
Terminal 2: `npm run dev -- --host 127.0.0.1 --port 5175`
Open http://localhost:5175. Vite proxies /api to the backend on port 5000.

## Working connections
- Email/password registration and login; scrypt password hashes and HttpOnly sessions.
- SQLite persistence under backend/data (excluded from Git).
- Account-specific trusted contacts, profile and settings.
- SOS and overdue timer events recorded in account history. Recording does not mean delivery.
- Location sharing enabled explicitly; unpredictable link, 1-hour expiry, stop/revoke controls and polling viewer.
- Browser timer reminders after the user grants notification permission.
- Fake calls and phone dialer links.

Run `npm run build` and `node backend-integration.cjs` for validation. The integration suite uses a separate temporary database and synthetic contacts; it sends no messages.

## Remaining external requirements
This is a local web application, not an installed React Native app. SMS/push delivery, verified phone/email ownership, password recovery, background tracking and closed-app timers are not implemented. No provider credentials are configured. Contact alerts must not be described as delivered.

Public live links require an HTTPS deployment, APP_ORIGIN configured to the exact site origin, a reverse proxy for /api, NODE_ENV=production, protected backups and suitable database hosting. Localhost links are only reachable on this computer. Do not deploy the development server as a public safety service.

The existing /verify-otp screen is removed from routing because no real OTP provider is connected. Emergency numbers must only be called for genuine emergencies.

## Gateway-free alerts
The /push-setup page registers a Web Push subscription after explicit permission. Each recipient signs in on their own device, enables push and accepts a one-use invitation (15-minute expiry). Sender can remove recipients. Push requests are rate limited; expired device subscriptions are removed. Service acceptance is not reported as confirmed delivery.

SOS demo remains a demo. Its separate real-action panel lets the user request push notifications or open a per-contact SMS composer. SMS is sent by the user in the phone's Messages app; opening a composer does not prove sending. Optional location acquisition is explicit. No SMS provider is required.

Web Push uses generated VAPID keys stored under backend/data/push-keys.json (not committed). Preserve this file across deployments. Configure VAPID_SUBJECT with your real support email (mailto:) or HTTPS URL in production. Public HTTPS hosting is needed for phones. On iPhone, iOS 16.4+ Home Screen installation is required for Web Push. This is a PWA implementation, not the pending React Native build. Receipt must be tested on actual recipient devices before relying on it.
