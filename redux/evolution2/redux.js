function createStore() {
    // 数据
    var state = {
        count: 1
    }
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
    //值改变时触发
    //存在的问题，数据直接被覆盖
    //所以不能直接改数据，要通过一个action指令来执行
    function stateChange(newState) {
        state = newState
        console.log('值改变为', val)
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