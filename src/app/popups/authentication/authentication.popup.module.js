var angular = require('angular');

module.exports = angular
  .module('sg.app.popups.authentication', [
    'sg.common.security',
    'sg.common.callbacks'
  ])
  .controller('LoginPopupController', require('./login/login.popup.controller'))
  .controller('LogoutPopupController', require('./logout/logout.popup.controller'))
  .factory('authenticationPopup', require('./authenticationPopup.factory'));
