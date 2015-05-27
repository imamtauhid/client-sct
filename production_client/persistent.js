console.log("persistent.js :: required")

define([], function(){

    function Persistent (config) {

        'use strict';

        console.log("persistent.js :: require");

        var _this = this,
            _config = {},
            _startup = '',
            _socket = {};

        var __constructor = function(config){

            console.log("persistent.js :: __constructor");

            if(config){

                _this.setConfig(config);

            }

        };

        _this.addQuery = function(key, value) {

            console.log("persistent.js :: addQuery")

            if(_config.query['query'] !== ''){

                _config.query['query'] += '&' + key + '=' + value

            }else{

                _config.query['query'] = key + '=' + value

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

        _this.connect = function(){

            console.log("persistent.js :: connect");

            var uri = 'http://' + _config.domain + ':' + _config.port + '/' + _config.namespace

            _socket = io(uri, _config.query)

            _this.acceptHandler(_this.startup)

        }

        _this.disconnect = function () {

            console.log("persistent.js :: disconnect")

            _socket.disconnect()

        }

        _this.setStartup = function (callback) {

            console.log("persistent.js :: setStartup")

            _this.startup = callback

        }

        _this.start = function(callback){

            console.log("persistent.js :: start");

            if(typeof callback == 'function') _this.setStartup(callback)

            _this.connect()

        }

        __constructor(config)

    }

    return Persistent

})



