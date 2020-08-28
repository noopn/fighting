const { subscribe, stateChange } = require('./redux');


// 客户点添加订阅
subscribe(() => {
    console.log('count 值发生改变')
})

//客户端改变值
stateChange(2)
stateChange(3)
stateChange(4)