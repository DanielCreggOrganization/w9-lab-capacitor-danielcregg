#!/bin/bash

# Update package list
sudo apt-get update

# Install Java 17 (Required for Android builds)
sudo apt-get install -y openjdk-17-jdk
export JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:/bin/java::")
echo "export JAVA_HOME=$JAVA_HOME" >> ~/.bashrc
echo "export PATH=\$PATH:\$JAVA_HOME/bin" >> ~/.bashrc

# Create Android SDK directory
mkdir -p ~/android-sdk
cd ~/android-sdk

# Download Android command-line tools
wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip
unzip commandlinetools-linux-*_latest.zip
mkdir -p cmdline-tools/latest
mv cmdline-tools/* cmdline-tools/latest/
rmdir cmdline-tools/latest/cmdline-tools
rm commandlinetools-linux-*_latest.zip

# Set up Android SDK environment variables
export ANDROID_SDK_ROOT=~/android-sdk
echo "export ANDROID_SDK_ROOT=~/android-sdk" >> ~/.bashrc
echo "export PATH=\$PATH:\$ANDROID_SDK_ROOT/cmdline-tools/latest/bin" >> ~/.bashrc
echo "export PATH=\$PATH:\$ANDROID_SDK_ROOT/platform-tools" >> ~/.bashrc

# Source the updated bashrc
source ~/.bashrc

# Accept licenses and install required packages
yes | sdkmanager --licenses
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"

echo "Setup complete! Please run 'source ~/.bashrc' or restart your terminal."