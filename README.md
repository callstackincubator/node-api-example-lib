# Example: Node-API addon for Node.js and React Native

This repo features a Node-API addon prebuilt for Node.js and React Native.

## How to run the app

1. Install dependencies (in the root)

```
npm install
```

2. Run the tests (using Jest via Node.js) (in the root)

```
npm test
```

3. Build the addon for React Native for the Android emulator and iOS simulator (in the root)

```
npm run build:rn
```

4. Change directory into the example app (the commands below should be executed from that directory there)

```
cd  ./example-app
```

4. Install the example app dependencies

```
npm install
```

5. Generate the native build directories (`./ios` and `./android`)

```
npx expo prebuild
```

5. Run the iOS example app

```
npm run ios
```

6. Follow the instructions on [building React Native from source](https://reactnative.dev/contributing/how-to-build-from-source#update-your-project-to-build-from-source): More specifically, add these lines to the bottom of the `android/settings.gradle` file:

```diff
// ...
include ':app'
includeBuild('../node_modules/@react-native/gradle-plugin')

+ includeBuild('../node_modules/react-native') {
+     dependencySubstitution {
+         substitute(module("com.facebook.react:react-android")).using(project(":packages:react-native:ReactAndroid"))
+         substitute(module("com.facebook.react:react-native")).using(project(":packages:react-native:ReactAndroid"))
+         substitute(module("com.facebook.react:hermes-android")).using(project(":packages:react-native:ReactAndroid:hermes-engine"))
+         substitute(module("com.facebook.react:hermes-engine")).using(project(":packages:react-native:ReactAndroid:hermes-engine"))
+     }
+ }
```

6. Manually set the `REACT_NATIVE_OVERRIDE_HERMES_DIR` environment variable (in `./example-app` - required only for the Android app to build)

```
export REACT_NATIVE_OVERRIDE_HERMES_DIR=`npx react-native-node-api vendor-hermes --silent`
```

7. Run the Android example app

```
npm run android
```

https://github.com/user-attachments/assets/3aa262ea-ce05-496b-8e5e-f46877ec7395

## What's included?

- A Node-API native module (named `node-api-example-lib`)
  - `CMakeLists.txt` declares the configuration for the CMake meta-build system, used to build the native module using both `cmake-js` (for Node.js) and `cmake-rn` (for React Native - iOS and Android).
  - `addon.cpp` implements a simple Node-API addon exporting a "sum" function.
  - `index.js` the entrypoint of package, performing a single `require` call to load the addon.
  - `index.d.ts` hand-crafted TypeScript declarations matching the addon implementation.
  - `index.test.ts` a test exercising the native addon using Jest via Node.js.
- `./example-app` Expo example app
  - `App.tsx` does the actual import of `node-api-example-lib` and providing a calculator UI.
  - `package.json` declaring dependencies on
    - `node-api-example-lib`: the example library in the root of the repository
    - `react-native-node-api`: the host package,
    - `react-native` in the restricted by the host package peer dependency,
  - `babel.config.js` adding the `react-native-node-api/babel-plugin` plugin to transform require calls of Node-API `.node` addon files to calls into the host package.
  - `metro.config.js` needed to enable resolving the `node-api-example-lib` from the parent directory of the app.

> [!NOTE]
> This example doesn't handle the complexity of distributing prebuilds for Node.js targeting multiple operating systems and architectures.
> See tools like https://www.npmjs.com/package/prebuild and https://www.npmjs.com/package/@mapbox/node-pre-gyp for solutions to this challenge.
