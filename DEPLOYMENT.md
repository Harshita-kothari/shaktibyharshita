# Shakti full-stack deployment

Deploy this directory as one Docker web service, one instance, with HTTPS and a persistent disk. Do not host only dist: authentication, alerts, sharing, and timers require the backend.

Render setup:
- Connect the source repository and select this directory as the root directory.
- Runtime: Docker; health check: /api/health.
- Persistent disk mount: /app/backend/data (paid service/disk required on Render).
- Environment VAPID_SUBJECT: mailto:YOUR_REAL_SUPPORT_EMAIL.
- Set VITE_GOOGLE_MAPS_API_KEY as the Docker build argument/environment used during image build. This is a browser key; restrict it to the deployed HTTPS domain and necessary Maps/Places APIs.
- RENDER_EXTERNAL_URL supplies the permitted origin automatically. For another host set APP_ORIGIN to the exact HTTPS origin and HOST=0.0.0.0.
- Keep one instance: SQLite and timer execution are local to that instance.
- Preserve and back up /app/backend/data including push-keys.json. Never commit or share it.

After deployment test fresh registration, contact saving, tracking links from a second phone, permission registration, circle invitation, and an explicitly agreed test notification. iPhone users need the installed home-screen app for web push. Phone numbers alone do not enable automatic SMS. Existing localhost accounts and device subscriptions are not migrated automatically. Local evidence remains on the original browser/device.

Deployment is not complete until the live health endpoint and frontend routes pass, and a recipient confirms receiving a test push. Timers require the server running; delivery is not guaranteed during an outage.
