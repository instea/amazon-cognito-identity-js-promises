import {
  ISignUpResult as OriginalISignUpResult,
  ICognitoUserPoolData,
  CognitoUserAttribute,
  CognitoUserPool as OriginalCognitoUserPool,
  ClientMetadata,
} from 'amazon-cognito-identity-js';

import { CognitoUser } from './CognitoUser';
import { promisifySimple } from './utils';

type ISignUpResult = OriginalISignUpResult & {
  user: CognitoUser;
};

export class CognitoUserPool {
  public origPool: OriginalCognitoUserPool;

  constructor(data: ICognitoUserPoolData) {
    this.origPool = new OriginalCognitoUserPool(data);
  }
  public signUp(
    username: string,
    password: string,
    userAttributes: CognitoUserAttribute[],
    validationData: CognitoUserAttribute[],
    clientMetadata?: ClientMetadata
  ) {
    return promisifySimple<ISignUpResult>(callback =>
      this.origPool.signUp(
        username,
        password,
        userAttributes,
        validationData,
        callback,
        clientMetadata
      )
    ).then(result => ({
      ...result,
      user: new CognitoUser(null, result.user),
    }));
  }
  public getCurrentUser(): CognitoUser | null {
    const user = this.origPool.getCurrentUser();
    if (!user) {
      return null;
    }
    return new CognitoUser(null, user);
  }
  public getClientId() {
    return this.origPool.getClientId();
  }
  public getUserPoolId() {
    return this.origPool.getUserPoolId();
  }
  public getUserPoolName() {
    return this.origPool.getUserPoolName();
  }
}
