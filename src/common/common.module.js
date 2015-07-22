var angular = require('angular');

module.exports = angular.module('sg.common', [
    require('./callbacks'),   // 'sg.common.callbacks',
    'sg.common.data',
    require('./directive'),   // 'sg.common.directive',
    require('./log'),         // 'sg.common.log',
    require('./navigation'),  // 'sg.common.navigation',
    'sg.common.resources',
    'sg.common.security',
    require('./state'),       // 'sg.common.state',
    'sg.common.translations',
    'sg.common.utils'
]);
