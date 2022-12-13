import { NodeCallback } from 'amazon-cognito-identity-js';

export function promisifySimple<R>(fn: NodeCallback<any, R>): Promise<R> {
  return new Promise<R>((resolve, reject) =>
    fn((err: Error, data: R) => {
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

export function promisifyStructured<R>(fn: StructuredCallback) {
  return new Promise<R>((onSuccess, onFailure) => fn({ onSuccess, onFailure }));
}
