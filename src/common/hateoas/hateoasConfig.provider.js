angular.module('sg.common.hateoas').provider('hateoasConfig', ['RestangularProvider', 'DEBUG_MODE', hateoasConfigProvider]);

function hateoasConfigProvider(RestangularProvider, DEBUG_MODE) {
    var self = this,
        dataEndPoint = '/',
        linksRel = '_links',
        selfRel = 'self',
        embeddedRel = '_embedded',
        pageRel = 'page';

    _.mixin(self, {
        setDataEndPoint: setDataEndPoint,
        setLinksRel    : setLinksRel,
        setSelfRel     : setSelfRel,
        setEmbeddedRel : setEmbeddedRel,
        setPageRel     : setPageRel
    }); // set up access methods

    configureRestangular();

    self.$get = _.constant({
        dataEndPoint: function () {
            return dataEndPoint
        },
        linksRel    : function () {
            return linksRel
        },
        selfRel     : function () {
            return selfRel
        },
        embeddedRel : function () {
            return embeddedRel
        },
        pageRel     : function () {
            return pageRel
        }
    });

    function setDataEndPoint(val) {
        if (_.endsWith(val, '/') && '/' !== val) {
            val = val.substr(0, val.lastIndexOf('/'));
        }
        dataEndPoint = val;
        RestangularProvider.setBaseUrl(dataEndPoint);
        return self;
    }

    function setSelfRel(val) {
        selfRel = val;
        return self;
    }

    function setLinksRel(val) {
        linksRel = val;
        return self;
    }

    function setEmbeddedRel(val) {
        embeddedRel = val;
        return self;
    }

    function setPageRel(val) {
        pageRel = val;
        return self;
    }

    function configureRestangular() {
        RestangularProvider.setDefaultHttpFields({cache: DEBUG_MODE});
        RestangularProvider.setMethodOverriders(["put", "patch"]);
    }
}
