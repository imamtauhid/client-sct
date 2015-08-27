
function SCR(config) {

  var _edge = require('edge')
  var __ = require('lodash')

  var _this = this,
    _config = {}

  var __constructor = function(config) {

    console.log("scr.js :: __constructor")

    _this.setConfig(config)

  }

  _this.setConfig = function(config) {

    console.log("scr.js :: setConfig")

    _config = _this.buildConfig(config)

  }

  _this.buildConfig = function(__config) {

    console.log("scr.js :: buildConfig")

    var config = {}

    config.name = __config.name
    config.port = __config.port
    config.library = {}

    __.each(__config.library.mapMethods, function(v, k) {

      config.library[k] = {}
      config.library[k].assemblyFile = __config.library.assemblyFile
      config.library[k].typeName = __config.library.typeName
      config.library[k].references = __config.library.references
      config.library[k].methodName = v

    })

    return config

  }

  _this.normalisasiKtm = function(data, callback) {

    console.log("scr.js : normalisasiKtm")

    var action,
      config = _config

    if (!data) {

      callback(new Error('>> data not passing'))
      return

    }

    if(!config)(

      callback(new Error('>> config not included '))
      return

    )

    try {

      action = _edge.func(config.library['normalisasiKtm'])

      return action({

        iPort: _config.port,
        iNDKPultol: (data.data && data.data.pultol) ? data.data.pultol : 0,
        iNDKPengawas: (data.data && data.data.pengawas) ? data.data.pengawas : 0,
        iGerbang: (data.data && data.data.gerbang) ? data.data.gerbang : 0,
        iGardu: (data.data && data.data.gardu) ? data.data.gardu : 0,
        iShift: (data.data && data.data.shift) ? data.data.shift : 0,
        iGolongan: (data.data && data.data.golongan) ? data.data.golongan : 0

      }, {

        ErrorDesc: ''

      }, true)

    } catch (err) {

      console.error(err)

      return null

    }

  }

  _this.getStatus = function(callback) {

    console.log("scr.js :: getStatus")

    var action,
      config = _config

    try {

      action = _edge.func(config.library['getStatus'])

      return action({

        port: config.port

      }, {

        ErrorDesc: '',
        Flag: false

      }, true)

    } catch (err) {

      console.error(err)

      return null

    }

  }

  _this.getSn = function() {

    console.log("scr.js :: getSn")

    var action,
      config = _config

    try {

      action = _edge.func(config.library['getSn'])

      return action({

        ErrorDesc: '',
        SerialNumber: ''

      }, true)

    } catch (err) {

      console.error(err)

      return null

    }

  }

  __constructor(config)

}

module.exports = SCR
