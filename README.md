# Example: Node-API addon for Node.js and React Native

This repo features a Node-API addon prebuilt for Node.js and React Native.

## How to run the app

1. Install dependencies: `npm install` (in the root)
2. Run the tests (using Jest via Node.js): `npm test` (in the root)
3. Build the addon for React Native for the Android emulator and iOS simulator: `npm run build:rn` (in the root)
4. Install the example app dependencies: `npm install` (in `./example-app`)
5. Run the iOS example app: `npm run ios` (in `./example-app`)
6. Run the Android example app: `npm run android` (in `./example-app`) \*\*\*

> [!NOTE]
> \*\*\* An additional step is needed when running the example app on Android - you need to manually set the `REACT_NATIVE_OVERRIDE_HERMES_DIR` environment variable, before where you're running the `npm run android` command:
>
> ```
> export REACT_NATIVE_OVERRIDE_HERMES_DIR=`npx react-native-node-api vendor-hermes --silent`
> ```

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
