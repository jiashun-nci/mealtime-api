# MealtimeApp


## Table of Contents

1. [Getting Started](#getting-started)
2. [Generating Entities](#entities)
3. [E2E Tests](#e2e-tests)

## Getting Started

To start the Expo packager, run:

```bash
npm start
```

To run on iOS, after the Expo packager starts:

- Press `i`
- To choose the emulator, press `Shift+i`

To run on Android, after the Expo packager starts:

- Press `a`
- To choose the emulator, press `Shift+a`

To run on Web, after the Expo packager starts:

- Press `w`

You can find out more about the Expo CLI and other Expo Features in the [Expo documentation](https://docs.expo.io/).


## E2E Tests

See the example end-to-end test in [`e2e/home-screen.spec.js`](e2e/home-screen.spec.js).

To run the e2e tests:

```bash
npm run test:e2e
```

You will need to have [`jq`](https://stedolan.github.io/jq/download/) installed for this command to work.
