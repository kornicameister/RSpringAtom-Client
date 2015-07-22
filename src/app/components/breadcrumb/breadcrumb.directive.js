module.exports = ['ControllerBoundDirective', breadcrumbDirective];

function breadcrumbDirective(ControllerBoundDirective) {
    return new ControllerBoundDirective({
        restrict   : 'E',
        controller : 'BreadcrumbController',
        templateUrl: require('./breadcrumb.tpl.html')
    })
}
