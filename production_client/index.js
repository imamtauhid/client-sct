(function(global, require, uuid, io){

    console.log("index.js :: require")

    var config,
        Persistent,
        SCR,
        configScr

    config = {}

    require.config({

        paths: {

            _persistent: '/admin/library/client_sct/production_client/persistent',
            _config: '/admin/library/client_sct/config/server',
            _jquery: '/admin/vendor/bower_components/jquery/dist/jquery'

        }

    })

    require(['_persistent', '_config', '_jquery'], function (Persistent, config) {

        console.log(config)

        if(!global.persistent) global.persistent = {}

        var selecter = new Persistent(config)

        global.persistent._selecter = selecter

        selecter.addQuery('name', 'selecter' + uuid.v4())

        selecter.setStartup(function(socket){

            socket.on('_online', function (data) {

                console.log("index.js :: _online :: data ", data)

                if(typeof global.persistent['_online'] == 'function') global.persistent['_online'](null, data)

            })

            socket.on('returnStatusScr', function(data){

                console.log("index.js :: returnStatusScr :: data ", data)

                if(typeof global.persistent['returnStatusScr'] == 'function') global.persistent['returnStatusScr'](null, data)

            })

        })

    }, function (err) {

        console.error(err)

    });

}(window, require, uuid, io))

// Persistent = require(__dirname + '/persistent.js')
// config = require(__dirname + '/../config/server.json')

// var scr = new SCR(configScr)
// var so = new Persistent(config)

// so.addQuery('name', configScr.name)

// so.start(function(socket){

//     socket.on('returnStatusScr', function(data){

//         console.log("index.js :: returnStatusScr :: data ", data)

//         console.log(data)

//     })

// })