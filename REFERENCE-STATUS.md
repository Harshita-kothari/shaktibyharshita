# Shakti reference implementation

The reference is an infographic, not editable source screens. The app now uses the Shakti brand, pink/white palette, wave splash, onboarding carousel, four-card SOS dashboard and bottom navigation. Original backend integrations are preserved. Stock portraits, exact female-silhouette logo and reference map art have not been copied; existing illustration and vector icons are used.

Implemented: signup/login and first-contact setup, held SOS preview and explicit push/SMS actions, connected contact circle, foreground location sharing, emergency dial links, timer, fake call, browser-permission audio/video recording with download, browser-supported voice activation, nearby Maps searches, route planning link, private server reports with validation/throttling. Unverified reports stay private.

Not complete: native Android/iOS app, reliable closed-app SOS/timer/location, automatic offline SMS, private cloud evidence storage, embedded live map/place database, verified safer-route scores, community moderation tools and full multilingual translation. Language screen clearly states current English support. Real device push still requires HTTPS setup and testing.

Validation: frontend build and ESLint; isolated backend suite including private reports and non-public unverified reports; browser splash → onboarding and dashboard inspection. Recording, speech permissions, real calls, real SMS and live external notifications were not triggered in automated testing.
