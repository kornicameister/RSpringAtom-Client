module.exports = function (conf) {

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

    var /**
         {@type Array} of files that will be included in every test suit
         */
        globalFilesToInclude = [
            'node_modules/chai/chai.js',
            'node_modules/sinon-chai/lib/sinon-chai.js',
            'node_modules/sinon/pkg/sinon.js',
            {pattern: 'bower_components/angular/angular.js', included: true},
            {pattern: 'src/app/**/*.html', included: true},
            {pattern: 'src/common/**/*.html', included: true},
            {pattern: 'src/**/*.js', included: true}
        ],
        /**
         {@type Array} of files that will be excluded in every test suit
         */
        globalToExclude = [
            'src/springatom.js'         // dont run application
        ],
        defaultBrowsers = ['ChromeCanary'];

    return {
        basePath             : '../',
        port                 : 8666,
        colors               : true,
        captureTimeout       : 60000,
        frameworks           : [
            'jasmine',
            'requirejs'
        ],
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
        // override set of settings from the passed conf literal
        browsers             : conf.browsers || defaultBrowsers,
        logLevel             : conf.logLevel || 'INFO',
        singleRun            : conf.singleRun || false,
        autoWatch            : conf.autoWatch || true,
        exclude              : updateArray(globalToExclude, conf.exclude || []),
        files                : updateArray(globalFilesToInclude, conf.files || [])
    }
};
