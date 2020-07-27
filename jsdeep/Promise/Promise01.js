/*
 * @Author: your name
 * @Date: 2020-05-26 10:06:51
 * @LastEditTime: 2020-05-26 15:20:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study/jsdeep/Promise/Promise01.js
 */
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function Promise01(excutor) {
    const self = this
    self.status = PENDING
    self.value = undefined
    self.reason = undefined
    self.onFulfilledQue = []
    self.onRejectedQue = []

    const resolve = (value) => {
        if (value instanceof Promise01) {
            return value.then(resolve, reject)
        }
        if (self.status === PENDING) {
            setTimeout(() => {
                self.status = RESOLVED
                self.value = value
                self.onFulfilledQue.forEach(fn => {
                    fn(self.value)
                })
            }, 0);
        }
    }

    const reject = (reason) => {
        if (self.status === PENDING) {
            setTimeout(() => {
                self.status = REJECTED
                self.reason = reason
                self.onRejectedQue.forEach(fn => {
                    fn(self.reason)
                })
            }, 0);
        }
    }


    try {
        excutor(resolve, reject)
    } catch (error) {
        resolve(error)
    }
}
function resolvePromise(x, promise2, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('DEAD circle'))
    }
    let called = false
    if (x != null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(y, promise2, resolve, reject)
                }, e => {
                    if (called) return
                    called = true
                    reject(e)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }
    } else {
        resolve(x)
    }
}
Promise01.prototype.then = function (onFulfilled, onRejected) {
    let self = this
    let promise2
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    if (self.status === PENDING) {
        return promise2 = new Promise01((resolve, reject) => {
            self.onFulfilledQue.push((value) => {
                try {
                    let x = onFulfilled(value)
                    resolvePromise(x, promise2, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
            self.onRejectedQue.push((reason) => {
                try {
                    let x = onRejected(reason)
                    resolvePromise(x, promise2, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }
    if (self.status === RESOLVED) {
        return promise2 = new Promise01((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value)
                    resolvePromise(x, promise2, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0);
        })
    }
    if (self.status === REJECTED) {
        return promise2 = new Promise01((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason)
                    resolvePromise(x, promise2, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0);

        })
    }

}

Promise01.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

// 执行测试用例需要用到的代码
Promise01.deferred = function () {
    let defer = {};
    defer.promise = new Promise01((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}
try {
    module.exports = Promise01
} catch (e) { }