# Shakti — Safety. Support. Always.

Responsive safety web app built with React/Vite and an Express/SQLite backend.

## Run locally

Requires Node.js 22. Frontend and backend need separate terminals.

```sh
npm ci
npm run dev -- --port 5175
```

```sh
cd backend
npm ci
npm start
```

Open http://localhost:5175. Maps and Nearby Help use free OpenStreetMap (no API key or billing needed). Private credentials and runtime data are excluded from Git.

## Features

- Account registration, login and recovery codes
- Trusted contacts, SOS hold flow and connected-recipient push alerts
- Live location links, check-in timer and notification inbox
- Nearby help, emergency dialler links and manual SMS message preparation
- Voice SOS, fake call and local evidence recording
- Hindi/English and light/dark themes

## Validation

```sh
npm run lint
npm run build
node language-test.cjs
node backend-integration.cjs
node recovery-integration.cjs
```

Backend tests use isolated synthetic databases. Never send emergency alerts to real recipients without an agreed test.

## Deployment and limitations

See [DEPLOYMENT.md](DEPLOYMENT.md), [BACKEND-SETUP.md](BACKEND-SETUP.md), [RECOVERY-SETUP.md](RECOVERY-SETUP.md) and [CHECK-REPORT.md](CHECK-REPORT.md).

Deploy frontend and backend together with HTTPS, one server instance and persistent storage. GitHub Pages alone cannot run this backend. SMS requires tapping Send; calls open the phone dialler. Push requires subscribed recipient devices and real-phone testing. Background/locked-phone tracking and native hardware SOS are not guaranteed by this web app. Evidence stays in the original browser. No emergency-delivery guarantee is implied.
