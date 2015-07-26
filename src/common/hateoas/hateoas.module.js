angular
    .module('sg.common.hateoas', [
        'sg.common.log',
        'sg.common.utils',
        'restangular'
    ])
    .config(function (hateoasConfigProvider) {
        hateoasConfigProvider.setDataEndPoint('/');
    });