import {
  ICognitoUserData as OriginalICognitoUserData,
  IAuthenticationCallback as OriginalIAuthenticationCallback,
  IMfaSettings,
  AuthenticationDetails,
  UserData,
  MFAOption,
  CognitoRefreshToken,
  CognitoUserAttribute,
  CognitoUserSession,
  ICognitoUserAttributeData,
  CognitoUser as OriginalCognitoUser,
  ClientMetadata,
} from 'amazon-cognito-identity-js';

import { CognitoUserPool } from './CognitoUserPool';
import { promisifySimple, promisifyStructured } from './utils';

type ICognitoUserData = OriginalICognitoUserData & {
  Pool: CognitoUserPool;
};

// FIXME: IAuthenticationCallback.onSuccess contains 2 arguments, for now leaving out second one (userConfirmationNecessary) as it would require interface change
type IAuthenticationCallback = Omit<
  OriginalIAuthenticationCallback,
  'onSuccess' | 'onFailure'
>;

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
    authenticationDetails: AuthenticationDetails,
    callbacks?: IAuthenticationCallback
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      this.origUser.authenticateUser(authenticationDetails, {
        ...cb,
        ...callbacks,
      })
    );
  }
  public initiateAuth(
    authenticationDetails: AuthenticationDetails,
    callbacks?: IAuthenticationCallback
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      this.origUser.initiateAuth(authenticationDetails, { ...cb, ...callbacks })
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
    callbacks?: IAuthenticationCallback,
    clientMetaData?: ClientMetadata
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      this.origUser.sendCustomChallengeAnswer(
        answerChallenge,
        { ...cb, ...callbacks },
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
  public forgotPassword(
    callbacks?: {
      inputVerificationCode?: (data: any) => void;
    },
    clientMetaData?: ClientMetadata
  ): Promise<any> {
    return promisifyStructured(cb =>
      this.origUser.forgotPassword({ ...cb, ...callbacks }, clientMetaData)
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
    callbacks?: {
      mfaRequired?: (challengeName: any, challengeParameters: any) => void;
      customChallenge?: (challengeParameters: any) => void;
      mfaSetup?: (challengeName: any, challengeParameters: any) => void;
    },
    clientMetadata?: ClientMetadata
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      this.origUser.completeNewPasswordChallenge(
        newPassword,
        requiredAttributeData,
        { ...cb, ...callbacks },
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
  public getAttributeVerificationCode(
    name: string,
    callbacks?: {
      inputVerificationCode?: (data: string) => void | null;
    }
  ): Promise<string> {
    return promisifyStructured(cb =>
      this.origUser.getAttributeVerificationCode(name, { ...cb, ...callbacks })
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
  public associateSoftwareToken() {
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
    answerChallenge: string,
    callbacks?: {
      mfaRequired?: (challengeName: any, challengeParameters: any) => void;
      totpRequired?: (challengeName: any, challengeParameters: any) => void;
    }
  ): Promise<CognitoUserSession> {
    return promisifyStructured(cb =>
      this.origUser.sendMFASelectionAnswer(answerChallenge, {
        ...cb,
        ...callbacks,
      })
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
