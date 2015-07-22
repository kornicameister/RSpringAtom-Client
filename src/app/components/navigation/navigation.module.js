var angular = require('angular');

module.exports = angular
  .module('sg.app.components.navigation', [
    'ct.ui.router.extras.previous', // TODO: fix with require
    require('common/navigation'), // 'sg.common.navigation',
    require('common/callbacks'),  // 'sg.common.callbacks',
    require('common/directive')   // 'sg.common.directive'
  ])
  .controller('NavigationController', require('./navigation.controller'))
  .directive('sgNavigation', require('./navigation.directive'));
