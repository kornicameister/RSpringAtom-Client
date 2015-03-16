define(
    'app/components/header/header.controller',
    [
        'app/components/header/header.module',
        'lodash',
        'common/callbacks',
        'common/state/state.stateHelperProvider',
        'app/popups/authentication/authenticationPopup.factory'
    ],
    function headerController(module, _, callbacks) {
        "use strict";

        var onClickWrapper = callbacks.cancelEvent;

        return module.controller('HeaderController',
            ['$scope', '$interval', '$stateHelper', 'authenticationPopup', ctrl]
        );

        function AuthenticationListeners() {
        }

        function ctrl($scope, $interval, $stateHelper, authenticationPopup) {

            AuthenticationListeners.prototype.onLogin = function (event, authentication) {
                vm.authentication = authentication;
                if (notificationPromise || !vm.authentication.authenticated) {
                    return;
                }
                notificationPromise = $interval(function () {

                }, 10000);
            };
            AuthenticationListeners.prototype.onLogout = function (event, authentication) {
                vm.authentication = authentication;
                if (notificationPromise) {
                    $interval.cancel(notificationPromise);
                    notificationPromise = undefined;
                }
            };

            var vm = this,
                notificationPromise,
                authenticationListeners = new AuthenticationListeners();

            // API
            vm.authentication = {
                authenticated: false,
                username     : undefined
            };
            vm.stateTitle = '';
            vm.openLoginDialog = _.wrap(openLoginDialog.bind(vm), onClickWrapper);
            vm.openLogoutDialog = _.wrap(openLogoutDialog.bind(vm), onClickWrapper);

            // listeners
            $scope.$on('$authentication.login', authenticationListeners.onLogin.bind(vm));
            $scope.$on('$authentication.logout', authenticationListeners.onLogout.bind(vm));
            $scope.$on('$destroy', destroy.bind(vm));

            // initialize
            initialize();

            function openLoginDialog() {
                authenticationPopup.openLoginPopup();
            }

            function openLogoutDialog() {
                authenticationPopup.openLogoutPopup();
            }

            function initialize() {
                $stateHelper.getStateLabel().then(function (label) {
                    vm.stateTitle = label;
                })
            }

            function destroy() {
                if (notificationPromise) {
                    $interval.cancel(notificationPromise);
                }
            }
        }
    }
);