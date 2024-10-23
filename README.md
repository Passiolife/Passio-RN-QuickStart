
# Passio SDK Integration Example with Expo CLI

This repository showcases a reference demo app to help you integrate the `@passiolife/nutritionai-react-native-sdk-v3` SDK using the Expo framework. This Quick Start Guide walks you through the essential steps and provides examples for a seamless implementation with custom UI.

## Functionality Overview

In this Quick Start Guide, you will learn how to implement the following:

1. Installation
2. Configuring the SDK
3. Recognizing Image Remotely
4. Accessing Food Details


# 🚀  Steps to Run this Repo
## Prerequisites

 1. Node.js installed

     ```
     brew install node
     brew install watchman
     ```

     If you haven't set up your environment yet, please follow this [link](https://reactnative.dev/docs/set-up-your-environment?platform=android) to Set Up Your Environment.
  
       
 2. Yarn Install

      ```
      brew install yarn
      ```  
 3. Expo CLI installed

    ```
    yarn global add expo-cli
    ```

Access to GitHub Packages (for `@passiolife` scope)

## Steps

 1. Create `.npmrc` file and add at root level OR Create `.yarnrc.yml`file and add at root level

    ```bash
    //npm.pkg.github.com/:_authToken=YOUR_GITHUB_AUTH_TOKEN
    @passiolife:registry=https://npm.pkg.github.com
    ```

    OR

    ```
    nodeLinker: node-modules
    npmScopes:
      passiolife:
        npmRegistryServer: "https://npm.pkg.github.com"
        npmAuthToken: "YOUR_GITHUB_AUTH_TOKEN"
    yarnPath: .yarn/releases/yarn-4.3.1.cjs
    ```

 2. Create `.env` file at root and provide PASSIO_KEY

    ```
    PASSIO_KEY = YOUR_PASSIO_KEY
    ```

 3. Install dependencies

    ```bash
       yarn 
    ```

4. Create pre build

   ```bash
      npx expo prebuild --clean    
   ```

 5. Install pod for IOS

    ```bash
    cd ios && pod install && cd ..
    ```

 6. Run on IOS

    ```bash
    yarn ios
    ```
    
 7. Run on android

    ```bash
    yarn android
    ```
    
<br/>

# FAQ

##  1. What are the steps to integrate the @passiolife/nutritionai-react-native-sdk-v3 SDK into my Expo CLI framework project?

Follow below instructions for integration

 1. Create a GitHub Personal Access Token

    Go to GitHub Settings and create a "classic" personal access token with     read:packages access.

 2. Configure .npmrc

    Create an .npmrc file in the root directory of your project with the following     content, replacing GITHUB_ACCESS_TOKEN with your personal access token:

    ```
    //npm.pkg.github.com/:_authToken=GITHUB_ACCESS_TOKEN
    @passiolife:registry=<https://npm.pkg.github.com>
    ```

 3. Install Passio SDK

    Add the Passio SDK dependency to your package.json and run either npm or yarn to     install it.

    For npm:

    ```
    npm install @passiolife/nutritionai-react-native-sdk-v3
    ```

    For yarn:

    ```
    yarn add @passiolife/nutritionai-react-native-sdk-v3
    ```

 4. Install Expo Build Properties Plugin

    To manage Android-specific build settings, install the expo-build-properties     plugin.
    
    or npm:
    
    ```
    npm install --save-dev expo-build-properties
    ```
    
    For yarn:
    
    ```
    yarn add expo-build-properties --dev
    ```

 5. Update app.json for Android and iOS Permissions

    Add the necessary expo-build-properties and expo-camera configurations to app.json     at the root of your project.
    
    ```
    
    {
      "expo": {
        "plugins": [
          [
            "expo-build-properties",
            {
              "android": {
                "minSdkVersion": 26
              }
            }
          ],
          [
            "expo-camera",
            {
              "cameraPermission": "Allow App to access your camera",
              "microphonePermission": "Allow App to access your microphone",
              "recordAudioAndroid": true
            }
          ]
        ],
        "ios": {
          "infoPlist": {
            "NSCameraUsageDescription": "App wants to access your camera"
          }
        }
      }
    }
    ```

 6. Prebuild the Project

    Run the following command to generate native build files (this is required for     adding the native modules):

    ```
    npx expo prebuild --clean
    ```

 7. iOS: Install CocoaPods

    Navigate to the ios directory and install the necessary CocoaPods for iOS:

    ```
    cd ios && pod install && cd ..
    ```

 8. Run the Project

    To run the project on iOS:
    
    ```
    yarn ios
    ```

 9. To run the project on Android

     ```
     yarn android
     ```

## 2. <span style="color: #346ddb;">How can I integrate the @passiolife/nutritionai-react-native-sdk-v3 from scratch using the Expo CLI framework?</span>

 1. Create a New Expo Project

    First, create a new Expo project if you haven't done so already:
    
    Require Expo CLI
    
    ```
    yarn global add expo-cli
    ```
    
    ```
    npx create-expo-app my-nutrition-app
    cd my-nutrition-app
    ```
    
  Follow `What are the steps to integrate the @passiolife/    nutritionai-react-native-sdk-v3 SDK into my Expo CLI framework project?` Sections     for next steps


## For more detail click on  [documment](https://passio.gitbook.io/nutrition-ai/guides/react-native-sdk-docs/getting-started) 


Happy Coding !!!

