/**
 * 修改 plan 名字为 reducer
 * 修改 stateChange 名字为 dispatch
 * 修改 instruct 改为action
 * 
 * 问题：reduce 在redux中是耦合的需要用户自己配置
 * 问题：无法拆分state的状态
 */

function createStore(state) {
    // 数据
    var state = state;
    // 订阅
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

    // 顶一个改数据的计划
    function reducer(state, action) {
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
    //值改变时触发
    //存在的问题，数据直接被覆盖
    //所以不能直接改数据，要通过一个action指令来执行
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

module.exports = {
    createStore
}