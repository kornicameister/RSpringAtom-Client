var angular = require('angular');

angular
  .module('sg.app.components.header', [
    require('common/state'),     // 'sg.common.state',
    require('common/callbacks'), // 'sg.common.callbacks',
    require('common/log')        // 'sg.common.log'
  ])
  .controller('HeaderController', require('./header.controller'))
  .directive('sgHeader', require('./header.directive'));
