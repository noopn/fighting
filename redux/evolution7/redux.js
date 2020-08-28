/**
 * 修改state的时候，需要记录修改前的state状态
 * 需要知道是哪一个action修改的state
 * 即中间件的实现 目的是扩展函数的功能
 * 
 * 
 */
// 数据
function createStore(reducer, initState, middleWare) {
    if (middleWare) {
        return middleWare(createStore)(reducer, initState);
    }
    // 订阅
    var state = initState;
    var listen = []

    function subscribe(fn) {
        listen.push(fn);
    }
    //发布
    function pulish() {
        for (var i = 0; i < listen.length; i++) {
            listen[i]();
        }
    }

    function dispatch(action) {
        state = reducer(state, action)
        console.log('state值发生改变')
        pulish()
    }

    function getState() {
        return state
    }
    dispatch({
        type: Symbol('createStore')
    })
    return {
        getState,
        dispatch,
        subscribe
    }
}

function combinReducer(reducers) {
    return function (state, action) {
        //总的state
        let next = state;
        Object.keys(reducers).forEach(key => {
            // 拿到总的state 中对应拆分出的state
            const compState = state[key];
            // 获取到修改对应拆分state的reducer
            const reducer = reducers[key];
            const newState = reducer(compState, action);
            next = {
                ...next,
                [key]: newState
            }

        })
        return next;
    }
}

function middleWare(...middleWares) {
    return function (createStore) {
        return function (reducer,initState) {
            const store = createStore(reducer, initState);
            const mids = middleWares.map(middleWare => middleWare(store));
            mids.reverse().forEach(mid => store.dispatch = mid(store.dispatch));
            return store;
        }
    }

}

module.exports = {
    createStore,
    combinReducer,
    middleWare
}