/**
 * 添加initState
 */
const { createStore, combinReducer } = require('./redux');


const initState = {
    count: 1,
    name: 'Beijing'
}

function reducer1(state = initState, action) {
    switch (action.type) {
        case 'ADD_COUNT':
            return {
                ...state,
                count: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
const initState2 = {
    cat: 'mimi',
    dog: 'wangcai'
}
function reducer2(state = initState2, action) {
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                dog: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
const reducer = combinReducer({
    count: reducer1,
    animal: reducer2
});
const defaultState = {
    game: 'GTA'
}
const store = createStore(reducer, defaultState);
store.subscribe(() => {
    //承接react的视图层
    console.log('监听数改变', store.getState().count,store.getState().game,store.getState().animal);
})

//不可以直接修改数据
//改为通过一个指令
store.dispatch({
    type: 'ADD_COUNT',
    payload: 24
})


store.dispatch({
    type: 'CHANGE_NAME',
    payload: 'jindoudou'
})
