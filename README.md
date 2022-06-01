# Find My Compost

## Test user
      email = chastre-composte@mail.be
      password = @Azerty_123456

## Android deployment
1. bubblewrap init --manifest=https://vps.digitalternative.be/find-my-compost/manifest.webmanifest
      - https://vps.digitalternative.be/splash.png
2. bubblewrap build
4. test app: /home/boris/Android/Sdk/platform-tools/adb install -r ./app-release-signed.apk
3. create release aab file to google play console: https://play.google.com/console
