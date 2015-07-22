var angular = require('angular');

module.exports = angular
  .module('sg.common.navigation', [
    'LocalStorageModule',
     require('common/state') // 'sg.common.state'
   ])
   .service('$navigationService', require('./navigation.service'))
