const PENDING = 'pending'
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise1(fn) {
    const self = this;
    self.value = null;
    self.error = null;
    self.status = PENDING;
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];

    function resolve(value) {
        if (value instanceof Promise1) {
            return value.then(resolve, reject);
        }
        if (self.status === PENDING) {
            setTimeout(() => {
                self.status = FULFILLED;
                self.value = value;
                self.onFulfilledCallbacks.forEach((fn) => fn(self.value));
            }, 0)
        }
    }
    function reject(error) {
        if (self.status === PENDING) {
            setTimeout(function () {
                self.status = REJECTED;
                self.error = error;
                self.onRejectedCallbacks.forEach((fn) => fn(self.error));
            }, 0)
        }
    }
    try {
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

function resolvePromise(bridgepromise, x, resolve, reject) {
    //2.3.1规范，避免循环引用
    if (bridgepromise === x) {
        return reject(new TypeError('Circular reference'));
    }
    let called = false
    // 这个判断分支其实已经可以删除，用下面那个分支代替，因为promise也是一个thenable对象
    if (x instanceof Promise1) {
        if (x.status === PENDING) {
            x.then(y => {
                resolvePromise(bridgepromise, y, resolve, reject)
            }, error => {
                reject(error)
            });
        } else {
            x.then(resolve, reject)
        }
        // 2.3.3规范，如果 x 为对象或者函数
    } else if (x != null && ((typeof x === 'function') || (typeof x === 'object'))) {
        try {
            // 是否是thenable对象（具有then方法的对象/函数）
            //2.3.3.1 将 then 赋为 x.then
            let then = x.then
            if (typeof then === 'function') {
                //2.3.3.3 如果 then 是一个函数，以x为this调用then函数，且第一个参数是resolvePromise，第二个参数是rejectPromise
                then.call(x, y => {
                    if (called) return;
                    called = true
                    resolvePromise(bridgepromise, y, resolve, reject);
                }, error => {
                    if (called) return;
                    called = true
                    reject(error)
                })
            } else {
                //2.3.3.4 如果 then不是一个函数，则 以x为值fulfill promise。
                resolve(x)
            }
        } catch (e) {
            //2.3.3.2 如果在取x.then值时抛出了异常，则以这个异常做为原因将promise拒绝。
            if (called) return;
            called = true;
            reject(e)
        }
    } else {
        resolve(x)
    }
}

Promise1.prototype.then = function (onFulfilled, onRejected) {
    const self = this
    let bridgepromise
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    if (self.status === FULFILLED) {
        return bridgepromise = new Promise1((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value)
                    resolvePromise(bridgepromise, x, resolve, reject)
                } catch (error) {
                    reject(error);
                }
            }, 0);
        })
    }
    if (self.status === REJECTED) {
        return bridgepromise = new Promise1((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(self.error)
                    resolvePromise(bridgepromise, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0);
        })
    }
    if (self.status === PENDING) {
        return bridgepromise = new Promise1((resolve, reject) => {
            self.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(bridgepromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            self.onRejectedCallbacks.push((error) => {
                try {
                    let x = onRejected(error)
                    resolvePromise(bridgepromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        });
    };
}
Promise1.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}
// 执行测试用例需要用到的代码
Promise1.deferred = function () {
    let defer = {};
    defer.promise = new Promise1((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}
try {
    module.exports = Promise1
} catch (e) { }