module.exports = function () {

    var Server = require('karma').Server,
        testDir = require('../../conf/paths').TEST_DIR;

    return function(done){
        new Server({
            configFile: testDir + '/karma.unit.conf.js'
        }, done).start();
    }

};