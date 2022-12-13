import { NodeCallback } from 'amazon-cognito-identity-js';
export declare function promisifySimple<R>(fn: NodeCallback<any, R>): Promise<R>;
type StructuredCallback = (cb: {
    onSuccess: (data: any) => void;
    onFailure: (err: Error) => void;
}) => void;
export declare function promisifyStructured<R>(fn: StructuredCallback): Promise<R>;
export {};
