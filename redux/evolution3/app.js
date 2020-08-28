const { createStore } = require('./redux');


const initState = {
    count: 1,
    name: 'Beijing'
}


const store = createStore(initState);
store.subscribe(() => {
    //承接react的视图层
    console.log('监听数改变',store.getState());
})

//不可以直接修改数据
//改为通过一个指令
store.stateChange({
    type: 'ADD_COUNT',
    payload: 24
})

