# Shakti account recovery

Recovery codes work now without any email service. In Settings → Password recovery, verify the current password, generate a code, and save it outside the app. Only its SHA-256 hash is stored. Generating a new code invalidates the previous code. Forgot password → Use my saved recovery code accepts the account email and code. Successful reset invalidates all sessions, reset links, recovery codes and registered push devices. Sign in and re-enable notifications afterwards.

Without a saved code or configured email sender, a forgotten password cannot be safely recovered. There is no identity-check bypass.

Optional SMTP email:
Set SMTP_HOST, SMTP_PORT (587 STARTTLS or 465 TLS), SMTP_USER, SMTP_PASS, SMTP_FROM and APP_ORIGIN in the local backend environment. Do not send secrets in chat or commit the .env file. Email reset stays disabled until configured. APP_ORIGIN must be the exact trusted application origin; use HTTPS for deployment. Reset tokens are random, hashed in SQLite, single-use and expire in 15 minutes. The link token is in the URL fragment and is removed on page mount. The reset page does not load external images/maps and uses no-referrer.

Email delivery has not been tested against a real provider. Recovery tests use synthetic accounts and temporary storage, send no emails, and verify rejected credentials, code rotation/single use, expiry, invalidation and replacement passwords. Actual email receipt requires configured sender credentials and a separate agreed delivery test.

Language: More → Language → English / हिन्दी. Preference persists per browser/device. User names, phone numbers, Google place addresses, private reports and recorded media are not translated. Speech-recognition language is independently selected on Voice SOS. Core user interface and safety instructions have a Hindi dictionary; third-party browser/OS dialogs follow device settings.
