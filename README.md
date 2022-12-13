# amazon-cognito-identity-js-promises

This package provides promisified version of [amazon-cognito-identity-js](https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js) - Amazon Cognito Identity SDK for JavaScript.

## Installation

```sh
npm install amazon-cognito-identity-js-promises
```

## Basic Usage

```js
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js-promises';

const userPool = new CognitoUserPool({
  UserPoolId: '...',
  ClientId: '...',
});

// simple sign-in

try {
  const user = new CognitoUser({
    Pool: userPool,
    Username: 'myUsername',
  });
  user.setAuthenticationFlowType('USER_PASSWORD_AUTH');
  await user.authenticateUser(
    new AuthenticationDetails({
      Username: 'myUsername',
      Password: 'myPassword',
    })
  );
} catch (err) {
  console.error('error signing in', err);
}

console.log('current user', userPool.getCurrentUser());
```

See [amazon-cognito-identity-js](https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js) for more examples.
