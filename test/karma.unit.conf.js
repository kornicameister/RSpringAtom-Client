var conf = require('./conf/karma-shared-conf');

module.exports = function (config) {

    config.set(conf({
        files    : [
            {pattern: 'bower_components/angular-mocks/angular-mocks.js', included: true},
            {pattern: 'test/utils/utils.js', included: true},
            {pattern: 'test/src/unit/**/*Spec.js', included: true}
        ],
        logLevel : config.LOG_DEBUG,
        singleRun: true,
        browsers : ['PhantomJS']
    }));

};
