/**
 * 添加initState
 */
const {
    createStore,
    combinReducer,
    middleWare
} = require('./redux');

const logMiddleWare = (store) => (next) => (action) => {
    console.dir({
        do: 'Before',
        type: action.type,
        data: store.getState().count
    })
    next(action);
    console.dir({
        do: 'After',
        type: action.type,
        data: store.getState().count
    })
}

const exceptMiddleWare = (store) => (next) => (action) => {
    try {
        next(action)
    } catch (error) {
        console.log(error);
    }
}
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

const store = createStore(reducer, defaultState, middleWare(exceptMiddleWare, logMiddleWare));
store.subscribe(() => {
    //承接react的视图层
    console.log('监听数改变', store.getState().count, store.getState().game, store.getState().animal);
})

//不可以直接修改数据
//改为通过一个指令

store.dispatch({
    type: 'ADD_COUNT',
    payload: 24
})


// store.dispatch({
//     type: 'CHANGE_NAME',
//     payload: 'jindoudou'
// })