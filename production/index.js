console.log("index.js :: require")

var config,

    Persistent,
    SCR,
    configScr


config = {}

Persistent = require(__dirname + '/persistent.js')
SCR = require(__dirname + '/scr.js')
config = require(__dirname + '/../config/server.json')
configScr = require(__dirname + '/../config/scr.json')

var scr = new SCR(configScr)
var so = new Persistent(config)

so.addQuery('name', configScr.name)

so.start(function(socket) {

  socket.on('getStatusScr', function(data) {

    console.log("index.js :: getStatusScr :: data ", data)

    var scrStatus = scr.getStatus()
    var cardSn = scr.getSn()
    var normalisasiKtm = scr.normalisasiKtm(data)

    socket.emit('sct@returnStatusScr', {

      select: data.select,
      err: null,
      data: {

        scrStatus: scrStatus,
        cardSn: cardSn,
        normalisasiKtm: normalisasiKtm

      }

    })

  })


})

return false

// so.start(function(socket){

//     socket.on('getStatusScr', function(data){

//         console.log("persistent.js :: getStatusScr :: data ::" , data)

//         var select = data.select
//         var scrStatus = scr.getStatusScr()
//         var cardSn = scr.getSn()


// var data = test({

//     port: scr.getPort()

// }, {

//     ErrorDesc: '',
//     Flag: false

// }, true)

// var data1 = getSn({

//     ErrorDesc: '',
//     SerialNumber: ''

// }, true)


//         socket.emit('sct@returnStatusScr', {

//             select: select,
//             err: null,
//             data: {

//                 scrStatus: scrStatus,
//                 cardSn: cardSn

//             }

//         })

//     })

// })

