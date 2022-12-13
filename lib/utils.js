export function promisifySimple(fn) {
    return new Promise((resolve, reject) => fn((err, data) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(data);
    }));
}
export function promisifyStructured(fn) {
    return new Promise((onSuccess, onFailure) => fn({ onSuccess, onFailure }));
}
