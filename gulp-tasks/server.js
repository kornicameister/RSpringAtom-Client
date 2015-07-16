module.exports = function (gulp) {
    var express = require('express'),
        refresh = require('gulp-livereload'),
        liveReload = require('connect-livereload'),
        gzipStatic = require('connect-gzip-static'),
        liveReloadPort = 35729,
        serverPort = 3000;

    return function () {
        var distDir = require('../conf/paths').DIST_DIR,
            app = express(),
            server = require('http').createServer(app),
            io = require('socket.io')(server);

        app.use(liveReload({port: liveReloadPort}));
        app.use(gzipStatic(distDir));
        app.use(server.handleRequest);
        app.use(require('morgan')('dev'));

        // start up
        app.listen(serverPort, function () {
            console.log('Listening on server.port=' + serverPort);
        });
        refresh.listen(liveReloadPort, function () {
            console.log('Listening on liveReload.port=' + liveReloadPort);
        });
        // start up

        require('./watch')(gulp, refresh);

        return app;
    }
};
