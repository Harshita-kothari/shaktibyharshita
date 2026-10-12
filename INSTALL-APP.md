# Shakti ko phone app ki tarah install karna

Shakti ka login cookie-based hai aur backend same origin par chalna zaroori hai. Isliye app ko **live HTTPS URL** se chalana hoga (GitHub Pages par backend nahi chalta).

## Step 1 — Backend + frontend deploy karo (ek baar)
Render par Docker web service banao (details: DEPLOYMENT.md). Aapko milega jaise `https://shakti-xxxx.onrender.com`.

## Step 2 — Phone par install (PWA, sabse aasan)
- Android Chrome: URL kholo → menu (⋮) → **Install app** / **Add to Home screen**.
- iPhone Safari: Share → **Add to Home Screen** (web push ke liye zaroori).

## Step 3 — APK chahiye? (Play Store / file share ke liye)
1. https://www.pwabuilder.com par apna live URL daalo.
2. **Package for stores → Android** chuno (Trusted Web Activity). Ye wahi live site kholta hai, isliye login, push aur location sab waise hi chalte hain.
3. Download hui zip me APK + signing key milti hai. Signing key safe rakho.
4. PWABuilder jo `assetlinks.json` deta hai use `public/.well-known/assetlinks.json` me daalo aur dobara deploy karo (taaki address bar hide ho).

Capacitor/WebView wrapper mat use karo: usme cookie auth aur web push toot jaate hain.
