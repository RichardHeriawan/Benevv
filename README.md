# Benevv

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)


Benevv React Native frontend app.
## Table of Contents

1. [Benevv](#Benevv)
   1. [Setup](#Setup)
   2. [Testing](#Testing)
        1. [Unit Testing](#Unit-Testing)
        2. [Component Testing](#Components/Integration-Testing)
   3. [Deployment](#Deployment)
   4. [Built With](#Built-With)
   5. [Contributing](#Contributing)
   6. [Versioning](#Versioning)
   7. [Authors](#Authors)
   8. [License](#License)
   9. [Acknowledgements](#Acknowledgments)

## Setup

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Run together with [kharis repo](https://github.com/smarttwigs/benevv) backend.
- Create an expo.io account
- Clone this repo locally.
### Install React Native with Expo server

**Note**: The project was created running `expo init benevv --npm -t expo-template-tabs@38.0.8` (Please don't execute this note)


- Install [node 12.18.0](https://nodejs.org/en/download/)
- Run this commands in the root directory:
> npm install -g expo-cli

> npm install

- Login to expo CLI running the command: `expo login`
- Update `env.json` file. Modify the `serverUrl` constant with a Kharis server domain and path.

### Running
- Run this command in the root directory:
  
  > npm start
  
- This opens a webpage with a QR code link. The QR code link should be scanned with Camera app in iOS, or the Expo App in Android.
  
### Install Expo App in the phone
- You can test this app inside Expo App. Install Expo App: [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US) or [Apple iOS](https://apps.apple.com/us/app/expo-client/id982107779). 
- Is not recommended to use an Android simulator or iOS simulator. Simulators lack many main functionalities.

### Debugging

[Expo debugging workflow](https://docs.expo.io/workflow/debugging/)

### Troubleshooting
- If you want to reset the app to its initial state, delete the data and cache of the Expo App, uninstall it, then reinstall it.

## Testing

Being all setup, should be able to start running and testing the project.

### Unit Testing
For this we will be using [Jest React Native](https://jestjs.io/docs/en/tutorial-react-native), in order to do that, after downloading the source code and running `npm install`, you should also have Jest installed with:

> npm install --save-dev jest

In order to test a component as snapshot Unit Tests, are added in the `./native/__tests__`,  for example with the component `SplashScreen` from `./native/screens/SplashScreen.js`, we must create a file `SplashScreen-test.js` in there like:

``` javascript
import React from 'react'

import renderer from 'react-test-renderer'
import SplashScreen from '../screens/SplashScreen'

test('renders correctly', () => {
  const tree = renderer.create(<SplashScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})
```

and then run:

> npm run test


This will run every test script included in `__tests__` which will output something like:

```bash
Test Suites: 2 failed, 5 passed, 7 total
Tests:       2 failed, 5 passed, 7 total
Snapshots:   5 passed, 5 total
Time:        4.74s
Ran all test suites.
```

**Note**: For the actual project unit tests were added for some components used for the app. (connect using components fail because of redux)

### Components/Integration Testing

In order to test components, the following will be used [React Native Testing Library](https://github.com/callstack/react-native-testing-library), which can also be used for Unit Testing.

Here is an example on how it can be used, take as an example a `Hello.js` file in project directory, as:

```javascript
import React from 'react';
import {Text} from 'react-native';

const Hello = () => <Text>Hello, world!</Text>;

export default Hello;
```

Then a test file must be created inside ` __tests__`, called `Hello.specs.js`:
```javascript
import React from 'react';
import {render} from 'react-native-testing-library';
import Hello from '../Hello';

describe('Hello', () => {
  it('renders the correct message', () => {
    const {queryByText} = render(<Hello />);
    expect(queryByText('Hello, world!')).not.toBeNull();
  });
});
```

In the last script we use `render` from react-native-testing-library saying basically that what we expect as an output from the component is 'Hello, world!'.

Now running `npm run test` should output the tests, passing and failing scripts.

**For more info as lifecycles**: [Component Testing lifecycles](https://reactnativetesting.io/component/lifecycle-and-external-services.html#mocking-a-module)

## Deployment


## Built With

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.io/)

## Contributing

## Versioning

## Authors

* [Smarttwigs Team](https://github.com/orgs/smarttwigs/people)

## License


## Acknowledgments
