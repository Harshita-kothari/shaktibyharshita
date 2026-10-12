# Functional audit — 11 October 2026

Verified with isolated synthetic database: registration/login/logout, profile defaults and explicit updates reflected in account identity, contact limits/duplicates, account isolation, alert history, tracking coordinates/link updates/revocation, circle pairing and single-use codes, recipient inbox persistence without push devices, throttling, timer creation/cancellation/check-in/expiry. No real emergency message or call was sent.

Fixed in this audit:
- Profile Save now performs and awaits a server write; edits remain a draft until saved. Account display name updates too.
- Sequential contact/settings saves prevent older writes overwriting newer ones. Unauthenticated contacts cannot pretend to save.
- Timer reminder setting now controls the open-page browser notification at expiry. Timer polling avoids overlapping requests.
- Alert history refreshes every five seconds and distinguishes loading/failure from an empty inbox.
- Dedicated SMS fallback page prepares a message without entering SOS. Message uses Shakti branding.
- Fake call times out even with ringtone disabled.
- Live-sharing creation rejects duplicate in-flight actions; stop message distinguishes revoked live links from permanent snapshots.
- Setup cards navigate to actual tools; legacy journey route uses the server check-in timer; unknown URLs have a fallback.
- Report draft failures are handled and successful submissions clear the local draft. Route planner rejects blank destinations.
- Local owner moderation command supports list/publish/hide; publication requires human verification. No user report was published during checks.
- API timeout/network/invalid-response errors have actionable messages. Browser storage failure no longer breaks successful login.

Local owner moderation: node backend/moderate.cjs list; then publish REPORT_ID only after verifying the incident. hide REPORT_ID retracts an alert. This tool reads the local database and must never be exposed as a public endpoint.

Boundaries still requiring external setup or physical-device testing:
- Real phone push receipt requires public HTTPS, connected accounts and subscribed recipient devices. Accepted push requests do not prove receipt.
- SMS opens Messages and requires Send; phone calling opens a dialler. No SMS gateway configured.
- Current web/PWA cannot promise locked-phone/background location or hardware SOS. Audio/video remains local IndexedDB.
- Community alerts need an owner to verify reports. Route planner provides directions, not verified route safety scores.
- English/Hindi UI switching and secure recovery-code reset are implemented and tested. SMTP delivery requires sender configuration; email ownership at registration is still not verified. Voice SOS recognition has its own language selection.

This report does not certify emergency delivery reliability or native Android/iOS support.

Additional follow-up fixes:
- Live links created during stop/unmount are revoked; revocation errors and retry controls remain visible after tracking stops.
- Contacts and settings expose a retry after load/save failures. Writes enter the serialized save queue immediately.
- Timer reminders wait for the saved preference; notification fallback also works without an active service worker.
- Open dashboard inbox refreshes automatically; connected recipients can be refreshed manually.
- Notification clicks reuse an existing app window when possible. Hindi status translations and text spacing improved.

Follow-up validation: ESLint, production build and language regression checks. Physical-device delivery remains pending as described above.
