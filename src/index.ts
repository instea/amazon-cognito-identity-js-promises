import {
  IMfaSettings,
  AuthenticationDetails,
  UserData,
  MFAOption,
  NodeCallback,
  CognitoRefreshToken,
  CognitoUserAttribute,
  CognitoUserSession,
  ISignUpResult,
  ICognitoUserAttributeData,
  CognitoUser as OriginalCognitoUser,
  CognitoUserPool as OriginalCognitoUserPool,
} from 'amazon-cognito-identity-js';

export * from 'amazon-cognito-identity-js';

function promisifySimple<R>(fn: NodeCallback<any, R>) {
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

// FIXME: Leaving out arguments that come after callback (like clientMetadata, CognitoUser->sendMFACode.mfaType) because it is not possible easily override
// FIXME: IAuthenticationCallback.onSuccess contains 2 arguments, for now leaving out second one (userConfirmationNecessary) as it would require interface change
// FIXME: IAuthenticationCallback (and other structured callback objects) trigger more callbacks like IAuthenticationCallback->newPasswordRequired, mfaRequired, ... This is currently not supported
// FIXME: CognitoUserPool->getCurrentUser returns original user

export class CognitoUserPool extends OriginalCognitoUserPool {
  public override signUp(
    username: string,
    password: string,
    userAttributes: CognitoUserAttribute[],
    validationData: CognitoUserAttribute[]
  ) {
    return promisifySimple<ISignUpResult>(callback =>
      super.signUp(username, password, userAttributes, validationData, callback)
    );
  }
}

export class CognitoUser extends OriginalCognitoUser {
  public override getSession(): Promise<CognitoUserSession> {
    return promisifySimple(cb => super.getSession(cb));
  }
  public override refreshSession(
    refreshToken: CognitoRefreshToken
  ): Promise<any> {
    return promisifySimple(cb => super.refreshSession(refreshToken, cb));
  }
  public override authenticateUser(
    authenticationDetails: AuthenticationDetails
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      super.authenticateUser(authenticationDetails, cb)
    );
  }
  public override initiateAuth(
    authenticationDetails: AuthenticationDetails
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      super.initiateAuth(authenticationDetails, cb)
    );
  }
  public override confirmRegistration(
    code: string,
    forceAliasCreation: boolean
  ): Promise<any> {
    return promisifySimple(cb =>
      super.confirmRegistration(code, forceAliasCreation, cb)
    );
  }
  public override sendCustomChallengeAnswer(
    answerChallenge: any
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      super.sendCustomChallengeAnswer(answerChallenge, cb)
    );
  }
  public override resendConfirmationCode(): Promise<any> {
    return promisifySimple(cb => super.resendConfirmationCode(cb));
  }
  public override changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<'SUCCESS'> {
    return promisifySimple(cb =>
      super.changePassword(oldPassword, newPassword, cb)
    );
  }
  public override forgotPassword(): Promise<any> {
    return promisifyStructured(cb => super.forgotPassword(cb));
  }
  public override confirmPassword(
    verificationCode: string,
    newPassword: string
  ): Promise<undefined> {
    return promisifyStructured(cb =>
      super.confirmPassword(verificationCode, newPassword, cb)
    );
  }
  public override setDeviceStatusRemembered(): Promise<string> {
    return promisifyStructured(cb => super.setDeviceStatusRemembered(cb));
  }
  public override setDeviceStatusNotRemembered(): Promise<string> {
    return promisifyStructured(cb => super.setDeviceStatusNotRemembered(cb));
  }
  public override getDevice(): Promise<string> {
    return promisifyStructured(cb => super.getDevice(cb));
  }
  public override forgetDevice(): Promise<string> {
    return promisifyStructured(cb => super.forgetDevice(cb));
  }
  public override forgetSpecificDevice(deviceKey: string): Promise<string> {
    return promisifyStructured(cb => super.forgetSpecificDevice(deviceKey, cb));
  }
  public override sendMFACode(
    confirmationCode: string
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb => super.sendMFACode(confirmationCode, cb));
  }
  public override listDevices(
    limit: number,
    paginationToken: string | null
  ): Promise<any> {
    return promisifyStructured(cb =>
      super.listDevices(limit, paginationToken, cb)
    );
  }
  public override completeNewPasswordChallenge(
    newPassword: string,
    requiredAttributeData: any
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      super.completeNewPasswordChallenge(newPassword, requiredAttributeData, cb)
    );
  }
  public override globalSignOut(): Promise<string> {
    return promisifyStructured(cb => super.globalSignOut(cb));
  }
  public override verifyAttribute(
    attributeName: string,
    confirmationCode: string
  ): Promise<string> {
    return promisifyStructured(cb =>
      super.verifyAttribute(attributeName, confirmationCode, cb)
    );
  }
  public override getUserAttributes(): Promise<CognitoUserAttribute[]> {
    return promisifySimple(cb => super.getUserAttributes(cb));
  }
  public override updateAttributes(
    attributes: (CognitoUserAttribute | ICognitoUserAttributeData)[]
  ): Promise<string> {
    return promisifySimple(cb => super.updateAttributes(attributes, cb));
  }
  public override deleteAttributes(attributeList: string[]): Promise<string> {
    return promisifySimple(cb => super.deleteAttributes(attributeList, cb));
  }
  public override getAttributeVerificationCode(
    name: string
  ): Promise<undefined> {
    return promisifyStructured(cb =>
      super.getAttributeVerificationCode(name, cb)
    );
  }
  public override deleteUser(): Promise<string> {
    return promisifySimple(cb => super.deleteUser(cb));
  }
  public override enableMFA(): Promise<string> {
    return promisifySimple(cb => super.enableMFA(cb));
  }
  public override disableMFA(): Promise<string> {
    return promisifySimple(cb => super.disableMFA(cb));
  }
  public override getMFAOptions(): Promise<MFAOption[]> {
    return promisifySimple(cb => super.getMFAOptions(cb));
  }
  public override getUserData(): Promise<UserData> {
    return promisifySimple(cb => super.getUserData(cb));
  }
  public override associateSoftwareToken(callbacks: {
    associateSecretCode: (secretCode: string) => void;
    onFailure: (err: any) => void;
  }) {
    return promisifyStructured(cb =>
      super.associateSoftwareToken({
        associateSecretCode: cb.onSuccess,
        onFailure: cb.onFailure,
      })
    );
  }
  public override verifySoftwareToken(
    totpCode: string,
    friendlyDeviceName: string
  ) {
    return promisifyStructured(cb =>
      super.verifySoftwareToken(totpCode, friendlyDeviceName, cb)
    );
  }
  public override setUserMfaPreference(
    smsMfaSettings: IMfaSettings | null,
    softwareTokenMfaSettings: IMfaSettings | null
  ): Promise<string> {
    return promisifySimple(cb =>
      super.setUserMfaPreference(smsMfaSettings, softwareTokenMfaSettings, cb)
    );
  }
  public override sendMFASelectionAnswer(
    answerChallenge: string
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      super.sendMFASelectionAnswer(answerChallenge, cb)
    );
  }
}
