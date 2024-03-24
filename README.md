# Home Library Service

## Prerequisites

Hello, Reviewer! Here is detailed instructions on how to start project and run test!

Here is link to pushed docker image: https://hub.docker.com/repository/docker/tedzury/nodejs_home_lib_api/general

## Installing NPM modules

```
npm install
```

## Make .env file

Make your own .env file and copy content of .env.example into it, or just copy .env.example and rename it into .env.

## Docker:

Make sure you have Docker installed and running on your machine.

## Running application:

NB! Make sure you have no active running versions of application on you machine. Turn all off any another Docker container running previosly.

So, here are instructions:

Open terminal and type: 

```
npm run docker:start:dev
```

Then you can run is second terminal: 

```
npm run test
```

To check out if tests are actually passing.

After you finish checking out the task - come back to first terminal, press Ctrl + C;
Then open second terminal and type:

```
npm run docker:finish:dev
```

So, here you are. Everything done;

## Run test command

```
npm run test
```

Run this command into CLI and see 67 test cases completed. Here is it, that simple :)

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
