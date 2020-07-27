function createStore(reducer, initSate) {
    let state = initSate || {}
    let listener = []
    // 获取state
    const getState = () => state
    // 订阅
    const subscribe = (fn) => {
        listener.push(fn)
    }
    // 派发
    let dispatch = (action) => {
        state = reducer(state, action)
        listener.forEach(fn => fn())
    }
    // 初始化state
    dispatch({ type: Symbol() })
    return { getState, dispatch, subscribe }
}

function combineReducer(reducers) {
    const reducerKeys = Object.keys(reducers)
    return function (state, action) {
        let finnalState = {}
        for (let key of reducerKeys) {
            let reducer = reducers[key]
            let stateCurr = state[key]
            let stateCurrChange = reducer(stateCurr, action)
            finnalState[key] = stateCurrChange
        }
        return finnalState
    }
}
function combineReducers(reducers) {
    // 获取到所有keys 
    let reducerKeys = Object.keys(reducers)

    // 返回一个最终reducer函数，该函数依旧是原先reducer的参数，dispatch的时候调用 返回最后变化后的state
    return function (state, action) {
        // 最终所有reducer执行完（变化的state）的保存位置
        let finnalState = {}
        // 传入reducers 是对象
        // 键===state中的key 
        // 值是reducer函数，对应state中值
        for (let key of reducerKeys) {
            // 获取到当前reducer函数
            let reducer = reducers[key]
            // 获取到当前reducer需要改变的state的值
            let stateForKey = state[key]
            // 获取当前当前reducer需要改变的state的值后返回的值
            let stateKey = reducer(stateForKey, action)
            // 按照key 组装新的state
            finnalState[key] = stateKey
        }
        return finnalState
    }
}
module.exports = { createStore, combineReducer, combineReducers }