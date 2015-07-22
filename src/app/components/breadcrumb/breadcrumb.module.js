var angular = require('angular');

/**
 * @module sg.app.components.breadcrumb
 */
module.exports = angular
  .module('sg.app.components.breadcrumb', [
    require('common/state'),    // 'sg.common.state',
    require('common/directive'),// 'sg.common.directive'
  ])
  .factory('breadcrumbService', require('./breadcrumb.service'))
  .controller('BreadcrumbController', require('./breadcrumb.controller'))
  .directive('sgBreadcrumb', require('./breadcrumb.directive'))
