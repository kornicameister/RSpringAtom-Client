var wrap = require('lodash/function/wrap');

module.exports = ['$modal', authenticationPopupFactory];

function authenticationPopupFactory($modal) {
    return {
     /**
      * Open login popup that allows user to provide its username and password.
      * @type {openLoginPopup}
      */
      openLoginPopup : openLoginPopup,
      /**
       * Opens logout popup to cancel user session
       * @type {openLogoutPopup}
       */
      openLogoutPopup: openLogoutPopup
    };

    function openLoginPopup(cfg) {
        cfg = _.defaults({
            templateUrl : require('./login/login.popup.tpl.html'),
            controller  : 'LoginPopupController',
            controllerAs: 'vm',
            size        : 'lg'
        }, cfg || {});
        return $modal.open(cfg)
    }

    function openLogoutPopup(cfg) {
        cfg = _.defaults({
            templateUrl : require('./logout/logout.popup.tpl.html'),
            controller  : 'LogoutPopupController',
            controllerAs: 'vm',
            size        : 'sm'
        }, cfg || {});
        return $modal.open(cfg)
    }
}
