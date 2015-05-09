function SCR (config) {

    var _edge = require('edge')
    var __ = require('lodash')

    var _this = this,
        _config = {}

    var __constructor = function (config) {

            console.log("scr.js :: __constructor")

            _this.setConfig(config)

        }

        _this.setConfig = function (config) {

            console.log("scr.js :: setConfig")

            _config = _this.buildConfig(config)

        }

        _this.buildConfig = function (__config) {

            console.log("scr.js :: buildConfig")

            var config = {}

            config.name = __config.name
            config.port = __config.port
            config.library = {}

            __.each(__config.library.mapMethods, function (v, k) {

                config.library[k] = {}
                config.library[k].assemblyFile = __config.library.assemblyFile
                config.library[k].typeName = __config.library.typeName
                config.library[k].references = __config.library.references
                config.library[k].methodName = v

            })

            return config

        }

        _this.getStatus = function(callback){

            console.log("scr.js :: getStatus")

            var action,
                config = _config

                try{

                    action = _edge.func(config.library['getStatus'])

                    return action({

                        port: config.port

                    }, {

                        ErrorDesc: '',
                        Flag: false

                    }, true)

                }catch(err){

                    console.error(err)

                    return null

                }

        }

        _this.getSn = function () {

            console.log("scr.js :: getSn")

            var action,
                config = _config

                try{

                    action = _edge.func(config.library['getSn'])

                    return action({

                        ErrorDesc: '',
                        SerialNumber: ''

                    }, true)

                }catch(err){

                    console.error(err)

                    return null

                }

        }

        __constructor(config)

}

module.exports = SCR