var angular = require('angular'),
    vendorModule = angular.module('sg.app.vendor', [
        require('angular-animate'),
        require('angular-cookies'),
        require('angular-growl-v2')
    ]);

module.exports = vendorModule.name;
