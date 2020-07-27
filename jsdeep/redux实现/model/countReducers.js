let initState = { count: 1 }
function countReducer(state, actions) {
    if (!state) state = initState
    switch (actions.type) {
        case 'add': return {
            ...state,
            count: state.count + 1
        }
        case 'decre': return {
            ...state,
            count: state.count - 1
        }
        default: return state
    }
}
module.exports = { countReducer }