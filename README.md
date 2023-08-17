# MealtimeApi &App

## Download aab file or apk file for testing

[AAB]:(https://1drv.ms/u/s!Agnyl1E_rfxplfxo_BlqEtubVf7weg?e=Hq7jv9)


[APK]:(https://1drv.ms/u/s!Agnyl1E_rfxplfxpGGwjmbhaJMk_4Q?e=CoIDiz)

## Quick start
For RESTful API
```bash
cd mealtimeApi
./mvnw
```

For React Native APP
```bash
cd mealtimeApp
npm start
```

# More details

# BACKEND ---------------------------------------------------
# mealtimeApi

## Project Structure

Node is required for generation and recommended for development. `package.json` is always generated for a better development experience with prettier, commit hooks, scripts and so on.

In the project root, configuration files for tools like git, prettier, eslint, husky, and others that are well known and you can find references in the web.

`/src/*` structure follows default Java structure.

- `.yo-rc.json` - Yeoman configuration file
- `.yo-resolve` (optional) - Yeoman conflict resolver
- `.jhipster/*.json` -  entity configuration files

- `npmw` - wrapper to use locally installed npm.
  This wrapper makes sure npm is installed locally and uses it avoiding some differences different versions can cause. By using `./npmw` instead of the traditional `npm` you can configure a Node-less environment to develop or test your application.
- `/src/main/docker` - Docker configurations for the application and services that the application depends on

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

```
npm install
```

We use npm scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

```
./mvnw
npm start
```

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.


### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

```
npm install --save --save-exact leaflet
```

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

```
npm install --save-dev --save-exact @types/leaflet
```

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Note: There are still a few other things remaining to do for Leaflet that we won't detail here.


## Building for production

### Packaging as jar

To build the final jar and optimize the mealtime application for production, run:

```
./mvnw -Pprod clean verify
```

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

```
java -jar target/*.jar
```

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

```
./mvnw -Pprod,war clean verify
```

## Testing

To launch your application's tests, run:

```
./mvnw verify
```

### Client tests

Unit tests are run by [Jest][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

```
npm test
```

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

You can run a Sonar analysis with using the [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) or by using the maven plugin.

Then, run a Sonar analysis:

```
./mvnw -Pprod clean verify sonar:sonar
```

If you need to re-run the Sonar phase, please be sure to specify at least the `initialize` phase since Sonar properties are loaded from the sonar-project.properties file.

```
./mvnw initialize sonar:sonar
```

## Using Docker to simplify development

You can use Docker to improve your development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a postgresql database in a docker container, run:

```
docker-compose -f src/main/docker/postgresql.yml up -d
```

To stop it and remove the container, run:

```
docker-compose -f src/main/docker/postgresql.yml down
```

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

```
npm run java:docker
```

Or build a arm64 docker image when using an arm64 processor os like MacOS with M1 processor family running:

```
npm run java:docker:arm64
```

Then run:

```
docker-compose -f src/main/docker/app.yml up -d
```




# FRONTEND --------------------------------------------------
## mealtimeApp
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
