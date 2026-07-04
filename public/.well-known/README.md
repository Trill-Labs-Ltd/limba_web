# /.well-known — deep link verification files

These two files let `https://www.getlimba.com/start` open the Limba app
directly (iOS Universal Links / Android App Links) when it's installed, and fall
back to the website otherwise. They are matched against the mobile app's
`associatedDomains` (iOS) and `autoVerify` intent filter (Android) configured in
`limba_mobile/app.config.js`.

## apple-app-site-association (iOS)

- Must be served at `https://www.getlimba.com/.well-known/apple-app-site-association`
  **with no file extension**, over HTTPS, with **no redirects**, and with
  `Content-Type: application/json` (enforced via `next.config.js` headers).
- `appID` = `<TeamID>.<bundleId>` = `GY6477ZXJ3.com.TrillLabs.Limba-mobile`.
- Apple's CDN caches this file. After deploying, give it time and re-test on a
  real device (Universal Links do not work in the simulator).

## assetlinks.json (Android)

- Served at `https://www.getlimba.com/.well-known/assetlinks.json`.
- `sha256_cert_fingerprints` lists **every** signing key that ships the app. The
  committed file contains all three (no action needed):
  1. The local **debug** keystore fingerprint (works for `expo run:android`).
  2. The **EAS upload key** fingerprint (internal / EAS-signed builds).
  3. The **Google Play app-signing key** fingerprint — Play re-signs uploaded
     builds, so this is the one that matters for Play Store installs.

If the signing keys ever change (e.g. an upload-key reset, or a new app), refresh
these from **Play Console → Protected with Play → Play Store protection →
Protect app signing key → Manage Play app signing** (shows the App signing key
and Upload key SHA-256 fingerprints). Use each row's copy icon — the on-screen
value can be horizontally truncated.

### Verifying after deploy

- iOS: `https://app-site-association.cdn-apple.com/a/v1/www.getlimba.com`
- Android: `https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://www.getlimba.com&relation=delegate_permission/common.handle_all_urls`
- On-device (Android): `adb shell pm verify-app-links --re-verify com.trillLabs.limba`
  then `adb shell pm get-app-links com.trillLabs.limba`
