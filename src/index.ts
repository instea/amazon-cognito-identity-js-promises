import {
  ICognitoUserData as OriginalICognitoUserData,
  IMfaSettings,
  AuthenticationDetails,
  UserData,
  ICognitoUserPoolData,
  MFAOption,
  NodeCallback,
  CognitoRefreshToken,
  CognitoUserAttribute,
  CognitoUserSession,
  ISignUpResult as OriginalISignUpResult,
  ICognitoUserAttributeData,
  CognitoUser as OriginalCognitoUser,
  CognitoUserPool as OriginalCognitoUserPool,
  ClientMetadata,
} from 'amazon-cognito-identity-js';

export * from 'amazon-cognito-identity-js';

type ICognitoUserData = OriginalICognitoUserData & {
  Pool: CognitoUserPool;
};

type ISignUpResult = OriginalISignUpResult & {
  user: CognitoUser;
};

function promisifySimple<R>(fn: NodeCallback<any, R>): Promise<R> {
  return new Promise<R>((resolve, reject) =>
    fn((err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    })
  );
}

type StructuredCallback = (cb: {
  onSuccess: (data: any) => void;
  onFailure: (err: Error) => void;
}) => void;

function promisifyStructured<R>(fn: StructuredCallback) {
  return new Promise<R>((onSuccess, onFailure) => fn({ onSuccess, onFailure }));
}

// FIXME: IAuthenticationCallback.onSuccess contains 2 arguments, for now leaving out second one (userConfirmationNecessary) as it would require interface change
// FIXME: IAuthenticationCallback (and other structured callback objects) trigger more callbacks like IAuthenticationCallback->newPasswordRequired, mfaRequired, ... This is currently not supported

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

export class CognitoUser {
  public origUser: OriginalCognitoUser;

  constructor(data?: ICognitoUserData, originalUser?: OriginalCognitoUser) {
    if (data) {
      this.origUser = new OriginalCognitoUser({
        ...data,
        Pool: data.Pool.origPool,
      });
      return;
    }
    if (originalUser) {
      this.origUser = originalUser;
      return;
    }
    throw new Error('missing constructor arguments');
  }

  public getSession(): Promise<CognitoUserSession> {
    return promisifySimple(cb => this.origUser.getSession(cb));
  }
  public refreshSession(
    refreshToken: CognitoRefreshToken,
    clientMetadata?: ClientMetadata
  ): Promise<any> {
    return promisifySimple(cb =>
      this.origUser.refreshSession(refreshToken, cb, clientMetadata)
    );
  }
  public authenticateUser(
    authenticationDetails: AuthenticationDetails
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      this.origUser.authenticateUser(authenticationDetails, cb)
    );
  }
  public initiateAuth(
    authenticationDetails: AuthenticationDetails
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      this.origUser.initiateAuth(authenticationDetails, cb)
    );
  }
  public confirmRegistration(
    code: string,
    forceAliasCreation: boolean,
    clientMetadata?: ClientMetadata
  ): Promise<any> {
    return promisifySimple(cb =>
      this.origUser.confirmRegistration(
        code,
        forceAliasCreation,
        cb,
        clientMetadata
      )
    );
  }
  public sendCustomChallengeAnswer(
    answerChallenge: any,
    clientMetaData?: ClientMetadata
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      this.origUser.sendCustomChallengeAnswer(
        answerChallenge,
        cb,
        clientMetaData
      )
    );
  }
  public resendConfirmationCode(clientMetaData?: ClientMetadata): Promise<any> {
    return promisifySimple(cb =>
      this.origUser.resendConfirmationCode(cb, clientMetaData)
    );
  }
  public changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<'SUCCESS'> {
    return promisifySimple(cb =>
      this.origUser.changePassword(oldPassword, newPassword, cb)
    );
  }
  public forgotPassword(clientMetaData?: ClientMetadata): Promise<any> {
    return promisifyStructured(cb =>
      this.origUser.forgotPassword(cb, clientMetaData)
    );
  }
  public confirmPassword(
    verificationCode: string,
    newPassword: string,
    clientMetaData?: ClientMetadata
  ): Promise<undefined> {
    return promisifyStructured(cb =>
      this.origUser.confirmPassword(
        verificationCode,
        newPassword,
        cb,
        clientMetaData
      )
    );
  }
  public setDeviceStatusRemembered(): Promise<string> {
    return promisifyStructured(cb =>
      this.origUser.setDeviceStatusRemembered(cb)
    );
  }
  public setDeviceStatusNotRemembered(): Promise<string> {
    return promisifyStructured(cb =>
      this.origUser.setDeviceStatusNotRemembered(cb)
    );
  }
  public getDevice(): Promise<string> {
    return promisifyStructured(cb => this.origUser.getDevice(cb));
  }
  public forgetDevice(): Promise<string> {
    return promisifyStructured(cb => this.origUser.forgetDevice(cb));
  }
  public forgetSpecificDevice(deviceKey: string): Promise<string> {
    return promisifyStructured(cb =>
      this.origUser.forgetSpecificDevice(deviceKey, cb)
    );
  }
  public sendMFACode(
    confirmationCode: string,
    mfaType?: string,
    clientMetadata?: ClientMetadata
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      this.origUser.sendMFACode(confirmationCode, cb, mfaType, clientMetadata)
    );
  }
  public listDevices(
    limit: number,
    paginationToken: string | null
  ): Promise<any> {
    return promisifyStructured(cb =>
      this.origUser.listDevices(limit, paginationToken, cb)
    );
  }
  public completeNewPasswordChallenge(
    newPassword: string,
    requiredAttributeData: any,
    clientMetadata?: ClientMetadata
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      this.origUser.completeNewPasswordChallenge(
        newPassword,
        requiredAttributeData,
        cb,
        clientMetadata
      )
    );
  }
  public globalSignOut(): Promise<string> {
    return promisifyStructured(cb => this.origUser.globalSignOut(cb));
  }
  public verifyAttribute(
    attributeName: string,
    confirmationCode: string
  ): Promise<string> {
    return promisifyStructured(cb =>
      this.origUser.verifyAttribute(attributeName, confirmationCode, cb)
    );
  }
  public getUserAttributes(): Promise<CognitoUserAttribute[]> {
    return promisifySimple(cb => this.origUser.getUserAttributes(cb));
  }
  public updateAttributes(
    attributes: (CognitoUserAttribute | ICognitoUserAttributeData)[]
  ): Promise<string> {
    return promisifySimple(cb =>
      this.origUser.updateAttributes(attributes, cb)
    );
  }
  public deleteAttributes(attributeList: string[]): Promise<string> {
    return promisifySimple(cb =>
      this.origUser.deleteAttributes(attributeList, cb)
    );
  }
  public getAttributeVerificationCode(name: string): Promise<undefined> {
    return promisifyStructured(cb =>
      this.origUser.getAttributeVerificationCode(name, cb)
    );
  }
  public deleteUser(): Promise<string> {
    return promisifySimple(cb => this.origUser.deleteUser(cb));
  }
  public enableMFA(): Promise<string> {
    return promisifySimple(cb => this.origUser.enableMFA(cb));
  }
  public disableMFA(): Promise<string> {
    return promisifySimple(cb => this.origUser.disableMFA(cb));
  }
  public getMFAOptions(): Promise<MFAOption[]> {
    return promisifySimple(cb => this.origUser.getMFAOptions(cb));
  }
  public getUserData(params?: any): Promise<UserData> {
    return promisifySimple(cb => this.origUser.getUserData(cb, params));
  }
  public associateSoftwareToken(callbacks: {
    associateSecretCode: (secretCode: string) => void;
    onFailure: (err: any) => void;
  }) {
    return promisifyStructured(cb =>
      this.origUser.associateSoftwareToken({
        associateSecretCode: cb.onSuccess,
        onFailure: cb.onFailure,
      })
    );
  }
  public verifySoftwareToken(totpCode: string, friendlyDeviceName: string) {
    return promisifyStructured(cb =>
      this.origUser.verifySoftwareToken(totpCode, friendlyDeviceName, cb)
    );
  }
  public setUserMfaPreference(
    smsMfaSettings: IMfaSettings | null,
    softwareTokenMfaSettings: IMfaSettings | null
  ): Promise<string> {
    return promisifySimple(cb =>
      this.origUser.setUserMfaPreference(
        smsMfaSettings,
        softwareTokenMfaSettings,
        cb
      )
    );
  }
  public sendMFASelectionAnswer(
    answerChallenge: string
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      this.origUser.sendMFASelectionAnswer(answerChallenge, cb)
    );
  }
  public signOut() {
    return promisifySimple(cb => this.origUser.signOut(cb));
  }
  public getAuthenticationFlowType() {
    return this.origUser.getAuthenticationFlowType();
  }
  public getCachedDeviceKeyAndPassword() {
    return this.origUser.getCachedDeviceKeyAndPassword();
  }
  public getSignInUserSession() {
    return this.origUser.getSignInUserSession();
  }
  public getUsername() {
    return this.origUser.getUsername();
  }
  public setAuthenticationFlowType(authenticationFlowType: string) {
    return this.origUser.setAuthenticationFlowType(authenticationFlowType);
  }
  public setSignInUserSession(signInUserSession: CognitoUserSession) {
    return this.origUser.setSignInUserSession(signInUserSession);
  }
}
