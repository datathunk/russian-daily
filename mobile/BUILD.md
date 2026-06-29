# Russian Daily — Android APK Build Instructions

## Prerequisites

- Flutter SDK installed and on PATH (`flutter --version` to verify)
- Android SDK (API 34) installed — either via Android Studio or `sdkmanager`
- Java 17+ (`java -version`)

## First-time setup

```bash
cd mobile/
flutter pub get
```

This downloads `webview_flutter ^4.x` and all dependencies.

## Build release APK

```bash
cd mobile/
flutter build apk --release
```

Output APK:

```
mobile/build/app/outputs/flutter-apk/app-release.apk
```

## Install to connected Android device

```bash
flutter install
# or directly with adb:
adb install build/app/outputs/flutter-apk/app-release.apk
```

## Debug build (for testing without signing)

```bash
flutter build apk --debug
# Output: build/app/outputs/flutter-apk/app-debug.apk
```

## Notes

- The app wraps `https://learnru.high-level.app` in a full-screen WebView
- `minSdkVersion 21` — supports Android 5.0 (Lollipop) and above
- `targetSdkVersion 34` — targets Android 14
- `usesCleartextTraffic="false"` — HTTPS only, no plain HTTP
- Back button navigates within the WebView before exiting the app
- JavaScript and DOM storage are enabled for full app functionality

## Signing for production (optional)

To sign with a custom keystore instead of debug keys:

```bash
keytool -genkey -v -keystore ~/russian-daily.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias russian-daily

flutter build apk --release \
  --dart-define=KEYSTORE_PATH=~/russian-daily.jks \
  --dart-define=KEYSTORE_PASS=your_pass \
  --dart-define=KEY_ALIAS=russian-daily \
  --dart-define=KEY_PASS=your_pass
```

Or configure `android/key.properties` as per Flutter docs.
