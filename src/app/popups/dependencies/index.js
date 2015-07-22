var angular = require('angular'),
    app = angular.module('sg.app.popups.dependencies', [
        'sg.common.state',
        'ui.bootstrap.modal',
        'ui.bootstrap.tpls'
    ]);

module.exports = app.name;
