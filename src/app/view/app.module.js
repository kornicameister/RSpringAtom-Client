var angular = require('angular'),
    deps = [
      require('./abstract'), // 'sg.app.view.index',
      require('./home'), // 'sg.app.view.home',
      require('./about'), // 'sg.app.view.about',
      require('./admin'), // 'sg.app.view.admin',
      require('./dashboard'), // 'sg.app.view.dashboard'
    ];

module.exports = angular.module('sg.app.view', deps);
