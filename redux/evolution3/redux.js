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
    function plan(state, action) {
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
    function stateChange(instruct) {
        state = plan(state, instruct)
        console.log('state值发生改变')
        pulish()
    }

    function getState() {
        return state
    }

    return {
        getState,
        stateChange,
        subscribe
    }
}

module.exports = {
    createStore
}