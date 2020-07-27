let initState = { name: '', mobile: '' }
function infoReducer(state, actions) {
    if (!state) state = initState
    switch (actions.type) {
        case 'changeName': return {
            ...state,
            name: 'wtc'
        }
        case 'changeNum': return {
            ...state,
            mobile: '13026086635'
        }
        default: return state
    }
}

module.exports = { infoReducer }