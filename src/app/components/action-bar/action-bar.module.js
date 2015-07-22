var angular = require('angular');

module.exports = angular
  .module('sg.app.components.actionBar', [
    require('common/state'),    // 'sg.common.state',
    require('common/directive'),// 'sg.common.directive'
  ])
  .controller('ActionItemController', require('./item/action-item.controller'))
  .directive('actionItem', require('./item/action-item.directive'))
  .directive('actionBar', require('./action-bar.directive'));
