module.exports = ['ControllerBoundDirective', function (ControllerBoundDirective) {
    return new ControllerBoundDirective({
        restrict   : 'E',
        controller : 'NavigationController',
        templateUrl: require('./navigation.tpl.html')
    })
}];
