# GidebBoilerPlate

Boiler Plate for Gideb Projects

# folder structure -->

```
entry point: index.js
src/
  /Assets --> holds all assets
    /images --> images in this folder
    /fonts --> font files .otf files in here
  /Components --> holds reusable global components
    /Component --> holds
      /index.tsx
      /assets
      /android
      /ios
  /Config
    /appConfig.json --> will hold json file of static data needed -> i.e. url's
    /index.ts --> class to control async storage and data of user
  /Containers --> Container styles for screens
  /FireNames
    /Constants.ts --> enum variables to names Collections or any other constants
  /Hooks --> custom hooks needed like i.e. -> useTheme or usei18n
    /index.ts
  /Navigators --> navigation controlled here like bottom tabs/stacks/drawer
  /Screens
    /Screen
      /index.tsx
      /android
      /ios
      /assets
  /Services --> handle all api calls here
    /modules --> will separate all types of services by folders here
      /<service> -- type of service named here
        /index.ts --> export functions here
        /<methodOne>.ts --> name of function and what its used for named here
    /api.ts --> will handle all requests with this file with error handling
  /Store --> Redux
    /<Name>
      /index.ts
    /index.tsx --> RRF configurations here
  /Theme --> default colors and font sizes here with 'react-native-magnus'
    /index.ts
  /Translations --> internationalization and text here
    /ko
    /en
    /index.ts
  /Utils --> non network functions held here along with utility files
    /asyncStorage
      /index.ts class to use functions from async storage [ get, set, getAll, removeAll ]
      /StorageItemsNames.ts --> Object.freeze item names ( use screaming case)
    /Styles.ts --> require and export images here along with typography and colors if needed
    /Logger.ts --> class used for logging within the app
  App.tsx --> App rendering done here
```

# setup --> babel for @ to point at ./src

```
import <Component> from '@/Components/Component'

```

# react-native-clean-project

```
https://www.npmjs.com/package/react-native-clean-project

yarn add -D react-native-clean-project

"scripts": {
  "clean": "react-native-clean-project"
}
```

# react-native-rename --> to rename project

```
https://github.com/junedomingo/react-native-rename#readme

yarn add react-native-rename
1. git checkout -b rename-app
2. npx react-native-rename <newName>
3. npx react-native-rename "Travel App" -b com.<bundleIdentifier>
bundleIdentifier example: junedomingo.travelapp
```

# App Icon and Splash Screen

```
Configuration
Change the appicon#
To help generate appicons, you can use an online tool like appicon to generate for both iOS and Android all icons and image sets.

iOS 🍎#
To change the appicon of the iOS application, you need to replace all the content of

src > ios > *name_of_your_app* > Images.xcassets > AppIcon.appiconset
with your appicons generated with appicon for example.

Android 🤖#
To change the appicon of the Android application, you need to replace all the content of

src > android > app > src > res
with your appicons generated with appicon for example.

Change the splash screen icon
iOS 🍎#
You can use the same tool (appicon) to generate image sets (@1x, @2x, @3x). Then you just have to replace : Splash_icon@1x.png, Splash_icon@2x.png, Splash_icon@3x.png with yours in :

src > ios > *name_of_your_app* > Images.xcassets > SplashIcon.imageset
Android 🤖#
You just have to replace the splash_icon.png located at :

src > android > app > src > res > drawable
```

# @react-native-async-storage/async-storage

```
https://github.com/react-native-async-storage/async-storage#readme

yarn add @react-native-async-storage/async-storage
```

# react-native-magnus

```
styling framework for react-native

1. yarn add react-native-magnus
2. yarn add color react-native-animatable react-native-modal react-native-vector-icons deepmerge validate-color

```

# react-native-vector-icons

```
https://github.com/oblador/react-native-vector-icons

some platform configurations needed to be done to run icons correctly
```

# react-navigation

```
https://reactnavigation.org/docs/getting-started
1. yarn add @react-navigation/native
2. yarn add react-native-screens react-native-safe-area-context
3. npx pod-install ios || cd ios && pod install ( i think )
4. android/app/src/main/java/<your package name>/MainActivity.java ->
  a.) add in MainActivity class:
    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(null);
    }
  b.) import android.os.Bundle; --> add at top of file
5. yarn add @react-navigation/native-stack
6. yarn add @react-navigation/bottom-tabs

* if side drawer is wanted:
https://reactnavigation.org/docs/drawer-navigator#installation
1. yarn add @react-navigation/drawer
2. yarn add react-native-gesture-handler react-native-reanimated

```

# State Management --> redux

```
https://redux.js.org/introduction/getting-started

toolkit:
yarn add @reduxjs/toolkit react-redux

```

# react-native-community/hooks

```
https://github.com/react-native-community/hooks

yarn add @react-native-community/hooks

```

<!-- implement as needed -->

# zoontek/react-native-permissions

```
https://github.com/zoontek/react-native-permissions

yarn add react-native-permissions
```

# hossein-zare/react-native-dropdown-picker

```
https://github.com/hossein-zare/react-native-dropdown-picker
https://hossein-zare.github.io/react-native-dropdown-picker-website/

yarn add react-native-dropdown-picker

```

# react-native-snap-carousel / @types/react-native-snap-carousel

```
https://www.npmjs.com/package/react-native-snap-carousel

yarn add react-native-snap-carousel

https://www.npmjs.com/package/@types/react-native-snap-carousel

yarn add -D @types/react-native-snap-carousel
```

# react-native-fast-image

```
https://github.com/DylanVann/react-native-fast-image

yarn add react-native-fast-image
# RRF react-redux-firebase

```

# react-redux-firebase

```

https://github.com/prescottprue/react-redux-firebase
http://react-redux-firebase.com/

yarn add react-redux-firebase

```

# RNFirebase

```

https://rnfirebase.io/

yarn add @react-native-firebase/app
yarn add @react-native-firebase/auth
yarn add @react-native-firebase/storage
yarn add @react-native-firebase/firestore
yarn add @react-native-firebase/functions
yarn add @react-native-firebase/messaging
yarn add @react-native-firebase/database # for walkaround createUser bug

```

# redux-firestore

```

https://github.com/prescottprue/redux-firestore

yarn add redux-firestore

```

# redux-logger

```

https://github.com/LogRocket/redux-logger

yarn add redux-logger
yarn add -D @types/redux-logger

```

# redux-devtools-extension

```

https://github.com/zalmoxisus/redux-devtools-extension

yarn add -D redux-devtools-extension

```

# react-native-image-picker

```
https://github.com/react-native-image-picker/react-native-image-picker

yarn add react-native-image-picker

```

# react-native-progress

```
https://github.com/oblador/react-native-progress

yarn add react-native-progress

yarn add react-native-svg
```

# react-native-gifted-chat

```
https://github.com/FaridSafi/react-native-gifted-chat

yarn add react-native-gifted-chat
```

# patch-package

```
https://www.npmjs.com/package/patch-package

yarn add patch-package postinstall-postinstall

package.json -->
 "scripts": {
+  "postinstall": "patch-package"
 }

 useage: npx patch-package package-name

 needed for:
 *react-native-gifted-chat
  TypeError: _reactNative.Keyboard.removeListener is not a function. (In '_reactNative.Keyboard.removeListener('keyboardWillShow', invertibleProps.onKeyboardWillShow)', '_reactNative.Keyboard.removeListener' is undefined)
```

# react-native-slider ( @react-native-community/slider )

```

https://www.npmjs.com/package/@react-native-community/slider

yarn add @react-native-community/slider

import Slider from '@react-native-community/slider'

```

# react-native-calendar

```

https://www.npmjs.com/package/react-native-calendars

yarn add react-native-calendars

import {Calendar, CalendarList, Agenda} from 'react-native-calendars'

```

# blackuy/react-native-twilio-video-webrtc

```

https://github.com/blackuy/react-native-twilio-video-webrtc

yarn add https://github.com/blackuy/react-native-twilio-video-webrtc

ios: **** ---->
Option A: Install with CocoaPods (recommended)
Add this package to your Podfile
pod 'react-native-twilio-video-webrtc', path: '../node_modules/react-native-twilio-video-webrtc'
Note that this will automatically pull in the appropriate version of the underlying TwilioVideo pod.

Install Pods with
pod install

post install:
platform :ios, '11.0'

<key>NSCameraUsageDescription</key>
<string>Your message to user when the camera is accessed for the first time</string>
<key>NSMicrophoneUsageDescription</key>
<string>Your message to user when the microphone is accessed for the first time</string>

 ----->

android:
Then add the library to your settings.gradle file:
include ':react-native-twilio-video-webrtc'
project(':react-native-twilio-video-webrtc').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-twilio-video-webrtc/android')

And include the library in your dependencies in android/app/build.gradle:

dependencies {
    .....
    .....
    .....
    compile project(':react-native-twilio-video-webrtc')
}

You will also need to update this file so that you compile with java 8 features:

android {
    compileOptions {
        sourceCompatibility 1.8
        targetCompatibility 1.8
    }
}

Now you're ready to load the package in MainApplication.java. In the imports section, add this:

import com.twiliorn.library.TwilioPackage;

Then update the getPackages() method:

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            ...
            new TwilioPackage()
        );
    }

Permissions
For most applications, you'll want to add camera and audio permissions to your AndroidManifest.xml file:

    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />
    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
    <uses-feature android:name="android.hardware.microphone" android:required="false" />

Additional Tips
Under default settings, the Android build will fail if the total number of symbols exceeds a certain threshold. If you should encounter this issue when adding this library (e.g., if your build fails with com.android.dex.DexIndexOverflowException), you can turn on jumbo mode by editing your app/build.gradle:

android {
  ...
  dexOptions {
    jumboMode true
  }
}
If you are using proguard (very likely), you will also need to ensure that the symbols needed by this library are not stripped. To do that, add these two lines to proguard-rules.pro:

  -keep class org.webrtc.** { *; }
  -keep class com.twilio.** { *; }
  -keep class tvi.webrtc.** { *; }
```
