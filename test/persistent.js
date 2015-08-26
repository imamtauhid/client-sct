var io = require('socket.io-client')
var edge = require('edge')

console.log("sct.js :: required")

var config = {

    domain: '127.0.0.1',
    port: '2020',
    namespace: '',
    query: {

        query: 'room=sct&name=sct3',
        forceNew: true

    }

}

var test = edge.func({

    assemblyFile: 'TODLibrary.dll',
    typeName: 'TODLibrary.SmartCard',
    references: ["ACR120.dll"],
    methodName: 'GetStatusSCR' // This must be Func<object,Task<object>>

})

var getSn = edge.func({

    assemblyFile: 'TODLibrary.dll',
    typeName: 'TODLibrary.SmartCard',
    references: ["ACR120.dll"],
    methodName: 'GetSN' // This must be Func<object,Task<object>>

})

function Persistent (config) {

    'use strict';

    console.log("persistent.js :: require");

    var _this = this,
        _config = {},
        _socket = {};

    var __constructor = function(config){

        console.log("persistent.js :: __constructor");

        if(config){

            _this.setConfig(config);

        }

    };

    _this.emitHandler = function(event, data){

        console.log("persistent.js :: emitHandler");

        var packet = {};

        _socket.emit(event, data);

    }

    _this.sendMessage = function(data, callback){

        console.log("persistent.js :: sendMessage");

        _this.send('Message', data, callback)

    }

    _this.acceptHandler = function(callback){

        console.log("persistent.js :: acceptHandler");

        _socket.on('connect', function(){

            console.log("persistent.js :: onConnect");

            console.log("persistent.js :: onConnect :: id ", _socket.io.engine.id)

            // _this.emitHandler('sct@getSct', function(err, data){

            //     console.log("persistent.js :: emitHandelr callback")

            //     console.log(data)

            // })

            callback(_socket)

        })

        _socket.on('disconnect', function(){

            console.log("persistent.js :: onDisconnect");

        })

        _socket.on('reconnect', function(){

            console.log("persistent.js :: onReconnect");

        })

        _socket.on('error', function(){

            console.log("persistent.js :: onError");

        })

        _socket.on('reconnect_error', function(){

            console.log("persistent.js :: onReconnectError");

        })


        _socket.on('reconnect_attemp', function(){

            console.log("persistent.js :: onReconnectAttemp");

        })

        _socket.on('reconnect_failed', function(){

            console.log("persistent.js :: onReconnectFailed");

        })

        _socket.on('message', function(message){

            console.log("persistent.js :: message");

            console.log(message)

        })

    }

    _this.addListener = function(_event, fn){

        console.log("persistent.js :: addListener :: " + _event);

        _socket.on(_event, function(data){

            fn(data)

        })

    }

    _this.send = function(event, data, callback){

        console.log("persistent.js :: send");

        _this.emitHandler('send' + event, data, callback)

    }

    _this.get = function(event, callback){

        console.log("persistent.js :: get");

        _this.emitHandler('get' + event, null, callback)

    }

    _this.setConfig = function(config){

        console.log("persistent.js :: setConfig");

        _config = config

    }

    _this.connect = function(callback){

        console.log("persistent.js :: connect");

        var uri = 'http://' + _config.domain + ':' + _config.port + '/' + _config.namespace

        _socket = io(uri, _config.query)

        _this.acceptHandler(callback)

    }

    _this.start = function(callback){

        console.log("persistent.js :: start");

        _this.connect(callback)

    }

    __constructor(config)

}

var Sct = new Persistent(config)

Sct.start(function(socket){

    socket.on('getStatusScr', function(data){

        console.log("persistent.js :: getStatusScr :: data ::" , data)

        var select = data.select

        var data = test({

            port: 2

        }, {

            ErrorDesc: '',
            Flag: false

        }, true)

        var data1 = getSn({

            ErrorDesc: '',
            SerialNumber: ''

        }, true)

        socket.emit('sct@returnStatusScr', {

            select: select,
            err: null,
            data: {

                statusScr: data,
                dataCard: data1

            }

        })

    })

})