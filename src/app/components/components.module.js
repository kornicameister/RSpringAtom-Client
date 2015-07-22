/**
 * @name sg.app.components
 * @namespace sg.app
 * @author kornicameister@gmail.com
 */

/**
 * @ngdoc module
 * @memberOf sg.app
 * @module sg.app.components
 * @description
 *  <b>sg.app.components</b> serves as a wrapping module
 *  for all components used strictly in view state to define
 *  entire visible part.
 */
var angular = require('angular');

module.exports = angular.module('sg.app.components', [
    require('./breadcrumb'),        // 'sg.app.components.breadcrumb',
    require('./header'),            // 'sg.app.components.header',
    require('./footer'),            // 'sg.app.components.footer',
    require('./navigation'),        // 'sg.app.components.navigation',
    require('./action-bar')         // 'sg.app.components.actionBar'
]);
