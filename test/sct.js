var socket = require('socket.io-client')('http://127.0.0.1:2020/ws.127.0.0.1')
var rob = {}

var connectionName = 'smartcard'

console.log("sct.js :: required")

socket.on('connect', function(){

    console.log("sct.js :: onconnect")

    rob.sct(connectionName, 'name')

});
socket.on('check', function(callback){

    console.log("sct.js :: oncheck")

    callback(null, {
        err: null,
        data: {}
    })

})
socket.on('event', function(data){

    console.log("sct.js :: onevent")
    console.log(data)

})
socket.on('disconnect', function(){

    console.log("sct.js :: ondisconnect")

})
rob.sct = function(message, action, mode, method){

    console.log("sct.js :: sct")

    if(!method) method = 'get'
    if(!mode) mode = 'self'
    if(!action) action = 'check'

    socket.emit('sct', {

        action: action,
        mode: mode,
        method: method,
        message: message

    }, function(err, data){

        console.log(err)
        console.log(data)

    })

}

// var test = edge.func({

//     assemblyFile: 'ACR120.dll',
//     typeName: 'TODLibrary.SmartCard',
//     methodName: 'GetStatusSCR' // This must be Func<object,Task<object>>

// })

// console.log("sct.js :: test", test)

// var data = test({

//     port: 1

// }, {

//     ErrorDesc: '',
//     Flag: false

// }, true)