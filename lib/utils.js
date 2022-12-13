export function promisifySimple(fn) {
    return new Promise(function(resolve, reject) {
        return fn(function(err, data) {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
export function promisifyStructured(fn) {
    return new Promise(function(onSuccess, onFailure) {
        return fn({
            onSuccess: onSuccess,
            onFailure: onFailure
        });
    });
}
