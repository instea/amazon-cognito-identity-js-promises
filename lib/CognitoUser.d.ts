import { IAuthenticationCallback as OriginalIAuthenticationCallback, IMfaSettings, AuthenticationDetails, UserData, MFAOption, CognitoRefreshToken, CognitoUserAttribute, CognitoUserSession, ICognitoUserAttributeData, CognitoUser as OriginalCognitoUser, ClientMetadata, ICognitoStorage } from 'amazon-cognito-identity-js';
import { CognitoUserPool } from './CognitoUserPool';
type ICognitoUserData = {
    Username: string;
    Pool: CognitoUserPool;
    Storage?: ICognitoStorage;
};
type IAuthenticationCallback = Omit<OriginalIAuthenticationCallback, 'onSuccess' | 'onFailure'>;
export declare class CognitoUser {
    origUser: OriginalCognitoUser;
    constructor(data?: ICognitoUserData, originalUser?: OriginalCognitoUser);
    getSession(): Promise<CognitoUserSession>;
    refreshSession(refreshToken: CognitoRefreshToken, clientMetadata?: ClientMetadata): Promise<any>;
    authenticateUser(authenticationDetails: AuthenticationDetails, callbacks?: IAuthenticationCallback): Promise<CognitoUserSession>;
    initiateAuth(authenticationDetails: AuthenticationDetails, callbacks?: IAuthenticationCallback): Promise<CognitoUserSession>;
    confirmRegistration(code: string, forceAliasCreation: boolean, clientMetadata?: ClientMetadata): Promise<any>;
    sendCustomChallengeAnswer(answerChallenge: any, callbacks?: IAuthenticationCallback, clientMetaData?: ClientMetadata): Promise<CognitoUserSession>;
    resendConfirmationCode(clientMetaData?: ClientMetadata): Promise<any>;
    changePassword(oldPassword: string, newPassword: string): Promise<'SUCCESS'>;
    forgotPassword(callbacks?: {
        inputVerificationCode?: (data: any) => void;
    }, clientMetaData?: ClientMetadata): Promise<any>;
    confirmPassword(verificationCode: string, newPassword: string, clientMetaData?: ClientMetadata): Promise<undefined>;
    setDeviceStatusRemembered(): Promise<string>;
    setDeviceStatusNotRemembered(): Promise<string>;
    getDevice(): Promise<string>;
    forgetDevice(): Promise<string>;
    forgetSpecificDevice(deviceKey: string): Promise<string>;
    sendMFACode(confirmationCode: string, mfaType?: string, clientMetadata?: ClientMetadata): Promise<CognitoUserSession>;
    listDevices(limit: number, paginationToken: string | null): Promise<any>;
    completeNewPasswordChallenge(newPassword: string, requiredAttributeData: any, callbacks?: {
        mfaRequired?: (challengeName: any, challengeParameters: any) => void;
        customChallenge?: (challengeParameters: any) => void;
        mfaSetup?: (challengeName: any, challengeParameters: any) => void;
    }, clientMetadata?: ClientMetadata): Promise<CognitoUserSession>;
    globalSignOut(): Promise<string>;
    verifyAttribute(attributeName: string, confirmationCode: string): Promise<string>;
    getUserAttributes(): Promise<CognitoUserAttribute[]>;
    updateAttributes(attributes: (CognitoUserAttribute | ICognitoUserAttributeData)[]): Promise<string>;
    deleteAttributes(attributeList: string[]): Promise<string>;
    getAttributeVerificationCode(name: string, callbacks?: {
        inputVerificationCode?: (data: string) => void | null;
    }): Promise<string>;
    deleteUser(): Promise<string>;
    enableMFA(): Promise<string>;
    disableMFA(): Promise<string>;
    getMFAOptions(): Promise<MFAOption[]>;
    getUserData(params?: any): Promise<UserData>;
    associateSoftwareToken(): Promise<unknown>;
    verifySoftwareToken(totpCode: string, friendlyDeviceName: string): Promise<unknown>;
    setUserMfaPreference(smsMfaSettings: IMfaSettings | null, softwareTokenMfaSettings: IMfaSettings | null): Promise<string>;
    sendMFASelectionAnswer(answerChallenge: string, callbacks?: {
        mfaRequired?: (challengeName: any, challengeParameters: any) => void;
        totpRequired?: (challengeName: any, challengeParameters: any) => void;
    }): Promise<CognitoUserSession>;
    signOut(): Promise<unknown>;
    getAuthenticationFlowType(): string;
    getCachedDeviceKeyAndPassword(): void;
    getSignInUserSession(): CognitoUserSession | null;
    getUsername(): string;
    setAuthenticationFlowType(authenticationFlowType: string): string;
    setSignInUserSession(signInUserSession: CognitoUserSession): void;
}
export {};
