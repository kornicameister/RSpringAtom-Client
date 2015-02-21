define(
    [
        'common/callbacks',
        '../authentication.popup.module'
    ],
    function logoutPopupController(callbacks, module) {
        var cancelEventWrapper = callbacks.cancelEvent;

        return module.controller('LogoutPopupController', ['$modalInstance', 'securityService', ctrl]);

        function ctrl($modalInstance, securityService) {
            var vm = this;

            vm.logout = _.wrap(logout.bind(vm), cancelEventWrapper);
            vm.cancel = _.wrap(cancel.bind(vm), cancelEventWrapper);

            function logout() {
                securityService.logout().then(function () {
                    $modalInstance.close('logout');
                })
            }

            function cancel() {
                $modalInstance.dismiss('cancel');
            }
        }
    }
);