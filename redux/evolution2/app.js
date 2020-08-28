const { createStore } = require('./redux');

const initState = {
    count: 1,
    name: 'Beijing'
}
const store = createStore(initState);
store.subscribe(() => {
    //承接react的视图层
    console.log('监听数改变');
})
//不可以直接修改数据
store.stateChange({
    count: 2,
    name: 'Beijing'
})