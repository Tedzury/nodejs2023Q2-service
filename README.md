# Home Library Service

## Prerequisites

Hello, Reviewer! Here is detailed instructions on how to start project and run test!

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Make .env file

Make your own .env file and copy content of .env.example into it, or just copy .env.example and rename it into .env.

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

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
