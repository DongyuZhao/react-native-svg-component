# react-native-svg-component

This repository contains the source code to build common ui control collection in react-native for iOS and Android.

**Notes: All the command in this document should be run from the root folder of this repository if no other statements.**

## How to Use

### Get This Package

- run the command to install the package:

    ```bash
    yarn add react-native-svg-component
    yarn add react-native-svg
    ```

- run the command to link dependencies

    ```bash
    react-native link react-native-svg
    ```

### Usage

```javascript
import { Image } from 'react-native-svg-component';

// TODO: What to do with the module?
```

## Getting Started

### Prerequisites

Before we start please make sure your dev machine has been configured as following:

#### Windows

Before we start, please make sure you have install the following tools on you PC.

- NodeJS: [Download | Node.js](https://nodejs.org/en/download/).
- Git: [Download for Windows](https://git-scm.com/download/win).
- Yarn: [Installation | Yarn](https://yarnpkg.com/en/docs/.install#windows-stable).
- Watchman: [Installation | Watchman](https://facebook.github.io/watchman/docs/install.html).

#### macOS

Before we start, please make sure you have install the following tools on you Mac.

- Homebrew: [Installation](https://brew.sh/).
- Git:

    ```bash
    brew install git
    ```

- NodeJS:

    ```bash
    brew install node
    ```

- Yarn:

    ```bash
    brew install yarn
    ```

- Watchman:

    ```bash
    brew install watchman
    ```

### Setup Environment

After all the prerequisites have been met, please run the following command to setup your environment.

- react-native:

    ```bash
    yarn global add react-native-cli
    ```

- gulp-cli:

    ```bash
    yarn global add gulp-cli
    ```

### Clone the Repository

Before you clone this repository, please make sure you have setup a security token for you to access this repository from command lines.

```bash
git clone https://github.com/DongyuZhao/react-native-svg-component.git
```

**Notes: During the clone process, please enter the security token you have generated into your terminal when it asks for your password.**

### Restore Dependencies

Before start developing, we need to run following commands to restore all dependencies.

```bash
yarn restore
```

### TypeScript Development

Please use any editor you like to open the following path:

```bash
./source
```

## Debug

To get up and running we need to start react-native development server. Run the following commands:

```bash
yarn start
```

### Apply TypeScript Changes

Instead of recompiling your app every time you make a change, you can reload your app's JavaScript code instantly. To do so, select "Reload" from the Developer Menu. You can also press **Command⌘ + R** in the iOS Simulator, or press **R** twice on Android emulators.

If you find the combination key is not working on your iOS Simulator, open the Hardware menu, select Keyboard, and make sure that "Connect Hardware Keyboard" is checked.

### Accessing the In-App Developer Menu

You can access the developer menu by shaking your device or by selecting "Shake Gesture" inside the Hardware menu in the iOS Simulator. You can also use the `⌘D` keyboard shortcut when your app is running in the iOS Simulator, or `⌘M` when running in an Android emulator on Mac OS and `Ctrl+M` on Windows and Linux. Alternatively for Android, you can run the command `adb shell input keyevent 82` to open the dev menu (82 being the Menu key code).

### Automatic reloading

You can speed up your development times by having your app reload automatically any time your code changes. Automatic reloading can be enabled by selecting "Enable Live Reload" from the Developer Menu.

You may even go a step further and keep your app running as new versions of your files are injected into the JavaScript bundle automatically by enabling [Hot Reloading](https://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading) from the Developer Menu. This will allow you to persist the app's state through reloads.

**There are some instances where hot reloading cannot be implemented perfectly. If you run into any issues, use a full reload to reset your app.**

You will need to rebuild your app for changes to take effect in certain situations:

- You have added new resources to your native app's bundle, such as an image in `Images.xcassets` on iOS or the `res/drawable` folder on Android.
- You have modified native code (Objective-C/Swift on iOS or Java/C++ on Android).

### In-app Errors and Warnings

Errors and warnings are displayed inside your app in development builds.

#### Errors

In-app errors are displayed in a full screen alert with a red background inside your app. This screen is known as a RedBox. You can use `console.error()` to manually trigger one.

#### Warnings

Warnings will be displayed on screen with a yellow background. These alerts are known as YellowBoxes. Click on the alerts to show more information or to dismiss them.

As with a RedBox, you can use `console.warn()` to trigger a YellowBox.

YellowBoxes can be disabled during development by using `console.disableYellowBox = true;`. Specific warnings can be ignored programmatically by setting an array of prefixes that should be ignored:

```javascript
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']);
```

In CI/Xcode, YellowBoxes can also be disabled by setting the `IS_TESTING` environment variable.

**RedBoxes and YellowBoxes are automatically disabled in release (production) builds.**

### Chrome Developer Tools

To debug the JavaScript code in Chrome, select "Debug JS Remotely" from the Developer Menu. This will open a new tab at [http://localhost:8081/debugger-ui](http://localhost:8081/debugger-ui).

Select `Tools → Developer Tools` from the Chrome Menu to open the [Developer Tools](https://developer.chrome.com/devtools). You may also access the DevTools using keyboard shortcuts (`⌘⌥I` on macOS, `Ctrl` `Shift` `I` on Windows). You may also want to enable [Pause On Caught Exceptions](http://stackoverflow.com/questions/2233339/javascript-is-there-a-way-to-get-chrome-to-break-on-all-errors/17324511#17324511) for a better debugging experience.

**Note: the React Developer Tools Chrome extension does not work with React Native, but you can use its standalone version instead. Read [this section](debugging.md#react-developer-tools) to learn how.**

#### Debugging using a custom JavaScript debugger

To use a custom JavaScript debugger in place of Chrome Developer Tools, set the `REACT_DEBUGGER` environment variable to a command that will start your custom debugger. You can then select "Debug JS Remotely" from the Developer Menu to start debugging.

The debugger will receive a list of all project roots, separated by a space. For example, if you set `REACT_DEBUGGER="node /path/to/launchDebugger.js --port 2345 --type ReactNative"`, then the command `node /path/to/launchDebugger.js --port 2345 --type ReactNative /path/to/reactNative/app` will be used to start your debugger.

**Custom debugger commands executed this way should be short-lived processes, and they shouldn't produce more than 200 kilobytes of output.**

### Safari Developer Tools

You can use Safari to debug the iOS version of your app without having to enable "Debug JS Remotely".

- Enable Develop menu in Safari: `Preferences → Advanced → Select "Show Develop menu in menu bar"`
- Select your app's JSContext: `Develop → Simulator → JSContext`
- Safari's Web Inspector should open which has a Console and a Debugger

However, there are some disadvantages:

1. No sourcemaps when debugging
2. Every time the app is reloaded (using live reload, or by manually reloading), a new JSContext is created. Choosing "Automatically Show Web Inspectors for JSContexts" saves you from having to select the latest JSContext manually.

### React Developer Tools

You can use [the standalone version of React Developer Tools](https://github.com/facebook/react-devtools/tree/master/packages/react-devtools) to debug the React component hierarchy.

Run `react-devtools` from the terminal to launch the standalone DevTools app:

```bash
react-devtools
```

It should connect to your simulator within a few seconds.

#### Integration with React Native Inspector

Open the in-app developer menu and choose "Toggle Inspector". It will bring up an overlay that lets you tap on any UI element and see information about it.

However, when `react-devtools` is running, Inspector will enter a special collapsed mode, and instead use the DevTools as primary UI. In this mode, clicking on something in the simulator will bring up the relevant components in the DevTools.

You can choose "Toggle Inspector" in the same menu to exit this mode.

#### Inspecting Component Instances

When debugging JavaScript in Chrome, you can inspect the props and state of the React components in the browser console.

First, follow the instructions for debugging in Chrome to open the Chrome console.

Make sure that the dropdown in the top left corner of the Chrome console says `debuggerWorker.js`. **This step is essential.**

Then select a React component in React DevTools. There is a search box at the top that helps you find one by name. As soon as you select it, it will be available as `$r` in the Chrome console, letting you inspect its props, state, and instance properties.

### Accessing console logs

You can see the logs in the same terminal output as the packager.

You can also display the console logs for an iOS or Android app by using the following commands in a terminal while the app is running:

```bash
react-native log-ios
react-native log-android
```

You may also access these through `Debug → Open System Log...` in the iOS Simulator or by running `adb logcat *:S ReactNative:V ReactNativeJS:V` in a terminal while an Android app is running on a device or emulator.

If you are debugging in Chrome Dev Tools, the logs will also display in the Console tab.

### Performance Monitor

You can enable a performance overlay to help you debug performance problems by selecting "Perf Monitor" in the Developer Menu.
