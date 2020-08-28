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
function stateChange(val) {
    state.count = val;
    console.log('值改变为', val)
    pulish()
}

module.exports = {
    subscribe,
    stateChange
}

