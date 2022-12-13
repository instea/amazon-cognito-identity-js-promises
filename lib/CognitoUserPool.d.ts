import { ICognitoUserPoolData, CognitoUserAttribute, CognitoUserPool as OriginalCognitoUserPool, ClientMetadata } from 'amazon-cognito-identity-js';
import { CognitoUser } from './CognitoUser';
export declare class CognitoUserPool {
    origPool: OriginalCognitoUserPool;
    constructor(data: ICognitoUserPoolData);
    signUp(username: string, password: string, userAttributes: CognitoUserAttribute[], validationData: CognitoUserAttribute[], clientMetadata?: ClientMetadata): Promise<{
        user: CognitoUser;
        userConfirmed: boolean;
        userSub: string;
        codeDeliveryDetails: import("amazon-cognito-identity-js").CodeDeliveryDetails;
    }>;
    getCurrentUser(): CognitoUser | null;
    getClientId(): string;
    getUserPoolId(): string;
    getUserPoolName(): string;
}
