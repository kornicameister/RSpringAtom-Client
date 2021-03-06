angular.module('sg.app.view.about').config(['$stateHelperProvider', function ($stateHelperProvider) {
    $stateHelperProvider.state({
        name     : 'sg.about',
        url      : '/about',
        navigator: [
            'sg.home',
            'sg.dashboard',
            'sg.about'
        ],
        resolve  : {
            label: ['$translate', function ($translate) {
                return $translate('sg.about')
            }]
        },
        views    : {
            'content@': {
                templateUrl: 'app/view/about/about.tpl.html'
            }
        }
    });
}]);