var angular = require('angular');

module.exports = angular
    .module('springatom', [
        require('./app'),        // 'sg.app',
        require('./common')      // 'sg.common'
    ])
    .constant('ApplicationName', 'SpringAtom')
    .constant('Build', '0.0.1')
    .constant('Version', '0.0.1');
