/*
 * @Author: your name
 * @Date: 2020-05-22 14:13:48
 * @LastEditTime: 2020-05-22 14:15:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study/jsdeep/Promise_.js
 */
let PENDING = 'pending'
let RESOLVED = 'resolved'
let REJECTED = 'rejected'

function Promise_(excutor) {
    // Promise_状态
    this.status = PENDING
    // Promise_成功的值
    this.value = undefined
    // Promise_失败的原因
    this.reason = undefined
    // 成功回调队列
    this.resolveQue = []
    // 失败回调队列
    this.rejectQue = []

    const resolve = (value) => {
        if (this.status === PENDING) {
            // Promise_状态 成功
            this.status = RESOLVED
            // 保存成功的值
            this.value = value
            // 执行成功回调队列
            this.resolveQue.forEach(fn => {
                fn(value)
            })
        }
    }
    const reject = (reason) => {
        if (this.status === PENDING) {
            // Promise_状态 失败
            this.status = REJECTED
            // 保存失败的原因
            this.reason = reason
            // 执行失败回调队列
            this.rejectQue.forEach(fn => {
                fn(reason)
            })
        }
    }
    // 如果excutor出错 Promise_失败
    try {
        excutor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}
function resolvePromise_(x, resolve, reject, promise2) {
    // x 不能 === promise2
    if (x === promise2) {
        return reject(new Error('circle'))
    }
    if (x && (typeof x === ' function' || typeof x === 'object')) {
        try {
            // 判断x的值是否实现了thenable 
            if (typeof x.then === 'function') {
                x.then(y => {
                    resolvePromise_(y, resolve, reject, promise2)
                }, e => {
                    reject(e)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            reject(error)
        }

    } else {
        resolve(x)
    }
}
Promise_.prototype.then = function (onResolve, onReject) {




    return promise2 = new Promise_((resolve, reject) => {
        // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
        onResolve = typeof onResolve === 'function' ? onResolve : () => this.value;
        // onRejected如果不是函数，就忽略onRejected，直接扔出错误
        onReject = typeof onReject === 'function' ? onReject : err => { throw err };

        // 如果状态是RESOLVED, 传入成功值,执行onResolve
        if (this.status === RESOLVED) {
            try {
                let x = onResolve(this.value)
                // resolve(x)
                resolvePromise_(x, resolve, reject, promise2)
            } catch (error) {
                reject(error)
            }


        }
        // 如果状态是REJECTED,传入失败原因, 执行onReject
        if (this.status === REJECTED) {
            try {
                onReject(this.reason)
                // reject(x)
                resolvePromise_(x, resolve, reject, promise2)
            } catch (error) {
                reject(error)
            }

        }
        // 如果状态是PENDING, 成功失败的函数放入队列等待执行
        if (this.status === PENDING) {
            // 保存成功的回调
            this.resolveQue.push((value) => {
                try {
                    let x = onResolve(value)
                    resolvePromise_(x, resolve, reject, promise2)
                } catch (error) {
                    reject(error)
                }

            })
            // 保存失败的回调
            this.rejectQue.push((reason) => {
                try {
                    let x = onReject(reason)
                    resolvePromise_(x, resolve, reject, promise2)
                } catch (error) {
                    reject(error)
                }

            })
        }
    })
}

// 目前是通过他测试 他会测试一个对象
// 语法糖
Promise_.defer = Promise_.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise_((resolve,reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }
  module.exports = Promise_;
  //npm install promises-aplus-tests 用来测试自己的promise 符不符合promisesA+规范
  