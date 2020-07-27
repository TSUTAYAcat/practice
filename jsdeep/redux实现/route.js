const { createStore, combineReducer, combineReducers } = require('./store/createStore')
const { countReducer } = require('./model/countReducers')
const { infoReducer } = require('./model/infoReducers')

let reducer = combineReducer({ count: countReducer, info: infoReducer })
let store = createStore(reducer)

const action1 = { type: 'add' }
const action3 = { type: 'changeNum' }
const action4 = { type: 'changeName' }

// 中间件
let dispatch = store.dispatch
// // 记录日志
// store.dispatch = function (action) {
//     console.log(store.getState());
//     dispatch(action)
//     console.log(store.getState());
// }
// // 打印时间戳
// store.dispatch = function (action) {
//     console.log(new Date());
//     dispatch(action)
// }
// function printDate(action) {
//     console.log(new Date())
//     dispatch(action)
// }
// let printDate = (next) => (action) => {
//     console.log(new Date())
//     next(action)
// }

// let printLog = (next) => (action) => {
//     console.log(store.getState())
//     next(action)
//     console.log(store.getState())
// }
// function compose(...args) {
//     let fnArr = args.reverse()
//     console.log(fnArr);
//     return (res) => {
//         for (let fn of fnArr) {
//             res = fn(res)
//         }
//         return res
//     }
// }
// console.log(compose(printDate, printLog));
let printDate = (next) => (action) => {
    console.log(new Date())
    next(action)
}

let printLog = (next) => (action) => {
    console.log(store.getState())
    next(action)
    console.log(store.getState())
}
function compose(...args) {
    let fnArr = args.reverse()
    return (patch) => {
        for (let fn of fnArr) {
            patch = fn(patch)
        }
        return patch
    }
}

store.dispatch = compose(printDate, printLog)(dispatch)
store.dispatch(action1)

// store.dispatch = (action) => {
//     printLog(printDate(dispatch))
// }


// ----
// store.dispatch(action4)

