#!/bin/bash

# Ensure environment variables are set
if [ -z "$JAVA_HOME" ]; then
    echo "ERROR: JAVA_HOME is not set"
    exit 1
fi

if [ -z "$ANDROID_SDK_ROOT" ]; then
    echo "ERROR: ANDROID_SDK_ROOT is not set"
    exit 1
fi

# Build the app
ionic build --prod

# Sync with Capacitor
ionic capacitor sync android

# Navigate to Android project directory
cd android

# Grant execute permission to gradlew
chmod +x gradlew

# Build debug APK using Gradle
./gradlew assembleDebug

echo "Build complete! Your APK can be found at:"
echo "android/app/build/outputs/apk/debug/app-debug.apk"