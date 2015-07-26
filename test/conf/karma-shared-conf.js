var mainBowerFiles = require('main-bower-files'),
    paths = require('../../conf/paths'),
    path = require('path');

// configuration
var globalFilesToInclude = []
        .concat(getFrameworkScripts())
        .concat(getBowerScripts())
        .concat(getAppFiles()),
    globalToExclude = ['src/springatom.js'],
    defaultBrowsers = ['ChromeCanary'],
    mochaClientConfiguration = {
        reporter   : 'html',
        ui         : 'bdd',
        ignoreLeaks: false
    };

module.exports = function (conf) {
    return {
        basePath             : '../',
        port                 : 8666,
        colors               : true,
        captureTimeout       : 60000,
        frameworks           : ['mocha', 'sinon', 'chai'],
        reporters            : ['progress', 'coverage', 'junit'],
        preprocessors        : {
            'src/app/*.js'        : ['coverage'],
            'src/common/*.js'     : ['coverage'],
            'src/app/**/*.html'   : ['ng-html2js'],
            'src/common/**/*.html': ['ng-html2js']
        },
        coverageReporter     : {
            type: 'html',
            dir : 'test/results/coverage'
        },
        junitReporter        : {
            outputDir: 'test/results/'
        },
        ngHtml2JsPreprocessor: {
            moduleName     : 'templates',
            prependPrefix  : '',
            cacheIdFromPath: function (filepath) {
                filepath = filepath.replace('src/', '');
                return filepath;
            }
        },
        client               : {
            mocha: mochaClientConfiguration
        },
        // override set of settings from the passed conf literal
        browsers             : conf.browsers || defaultBrowsers,
        logLevel             : conf.logLevel || 'INFO',
        singleRun            : conf.singleRun || false,
        autoWatch            : conf.autoWatch || true,
        exclude              : updateArray(globalToExclude, conf.exclude || []),
        files                : updateArray(globalFilesToInclude, conf.files || [])
    }
};

/**
 * Utility function to append {@code append} array to the {@code original} array
 */
function updateArray(original, append) {
    var appendLength = append.length;

    for (var it = 0; it < appendLength; it++) {
        original.push(append[it]);
    }

    return original;
}

function getAppFiles() {
    return [
        {pattern: 'src/app/**/*.html', included: true},
        {pattern: 'src/common/**/*.html', included: true},
        {pattern: 'src/**/*.module.js', included: true},
        {pattern: 'src/**/*.js', included: true}
    ];
}

function getFrameworkScripts() {
    return [
        'node_modules/chai/chai.js',
        'node_modules/sinon/pkg/sinon.js',
        'node_modules/sinon-chai/lib/sinon-chai.js'
    ];
}

function getBowerScripts() {
    return mainBowerFiles({
        base          : paths.VENDOR_LIB,
        paths         : {
            bowerrc: path.join(__dirname, '../../.bowerrc')
        },
        filter        : /.*\.js$/i,
        checkExistence: true,
        debugging     : false
    });
}
