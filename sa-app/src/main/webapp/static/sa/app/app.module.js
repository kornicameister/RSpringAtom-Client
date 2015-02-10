define(
    [
        'angular',
        'less!./app',
        'common/state/state.module',
        './abstract/abstract.module.wrapper',
        './home/home.module.wrapper',
        './components/components.module'
    ],
    function app(angular) {
        /**
         * Application module of the <b>springatom</b>.
         * This module contains visible and functional parts of the application later
         * identified as:
         *
         * - controllers
         * - view specific (local) directives + controllers
         * - states
         * - local configurations
         *
         * In order to view components of the application (global controllers, views, states etc.) go to
         * module {@link sg.common}
         *
         * @module sg.app
         */
        angular.module('sg.app', [
            'sg.state',
            'sg.app.components',
            'sg.app.index',
            'sg.app.home'
        ]);

        angular.module('sg.app').config(['$statePageTitleProvider', function ($statePageTitleProvider) {
            "use strict";
            $statePageTitleProvider.setPageTitleExpression('sgAppPageTitle');
        }]);

        return angular.module('sg.app');
    }
);