module.exports = function breadcrumbDirective() {
    return {
        restrict        : 'E',
        controller      : 'HeaderController',
        controllerAs    : 'vm',
        bindToController: true,
        scope           : true,
        templateUrl     : require('./header.tpl.html')
    }
};
