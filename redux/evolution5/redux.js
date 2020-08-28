/**
 * reducer 拆分到客户端配置
 * 拆分state状态，实现combinReducer 方法
 * 
 * 问题: 初始化createStore 没有添加state参数
 * 问题: reducer合并state时不应该接收总的state
 */
// 数据
function createStore(reducer) {
    // 订阅
    var state = {};
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

    return {
        getState,
        dispatch,
        subscribe
    }
}

function combinReducer(reducers) {
    return function (state, action) {
        //总的state
        let store = state;
        Object.keys(reducers).forEach(key => {
            // 拿到总的state 中对应拆分出的state
            const compState = state[key];
            // 获取到修改对应拆分state的reducer
            const reducer = reducers[key];
            const newState = reducer(compState, action);
            store = {
                ...store,
                [key]: newState
            }

        })
        return store;
    }
}

module.exports = {
    createStore,
    combinReducer
}