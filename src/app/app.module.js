var angular = require('angular'),
    deps = [
        require('./view'), // 'sg.app.view',
        require('./components'), // 'sg.app.components',
        require('./popups'), // 'sg.app.popups',
        require('./vendor') // 'sg.app.vendor'
    ];

module.exports = angular
    .module('sg.app', deps)
    .value('$anchorScroll', angular.noop)
    .config(configureStickyState)
    .config(configureCompileProvider)
    .config(configureUrlRouter)
    .config(configureGrowl);

function configureGrowl(growlProvider, $httpProvider) {
    $httpProvider.responseInterceptors.push(growlProvider.serverMessagesInterceptor);
}

function configureUrlRouter($urlRouterProvider) {
    // case insensitive urls
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path(),
            normalized = path.toLowerCase();

        if (path !== normalized) {
            return normalized;
        }
    });
}

function configureCompileProvider($compileProvider, DEBUG_MODE) {
    $compileProvider.debugInfoEnabled(DEBUG_MODE);
}

function configureStickyState($stickyStateProvider, DEBUG_MODE) {
    $stickyStateProvider.enableDebug(DEBUG_MODE);
}
