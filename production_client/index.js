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
            _config: '/admin/library/client_sct/config/server'

        }

    })

    require(['_persistent', '_config'], function (Persistent, config) {

        console.log('Persistent')
        console.log(Persistent)
        console.log(config)

        var selecter = new Persistent(config)

        window.selecter = selecter

        selecter.addQuery('name', 'selecter' + uuid.v4())

        selecter.start(function(socket){

            socket.on('returnStatusScr', function(data){

                console.log("index.js :: returnStatusScr :: data ", data)

            })

        })

    }, function (err) {

        console.error(err)

    });

}(window, require, uuid, io))