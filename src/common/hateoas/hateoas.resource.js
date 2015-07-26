angular
    .module('sg.common.hateoas')
    .factory('HateoasResource', [
        'hateoasConfig',
        'Restangular',
        resource
    ]);

function resource(hateoasConfig, Restangular) {
    var baseUrl = hateoasConfig.dataEndPoint();

    function HateoasResource(config) {
        _.assign(this, config);
    }

    HateoasResource.prototype = {
        getOne : getOne,
        save   : save,
        update : update,
        remove : remove,
        findAll: findAll,
        find   : find
    };

    return HateoasResource;

    return Restangular.withConfig(configure);

    function configure(RestangularConfigurer){
      
    }

    function getOne(id) {
        return this.rest.one(this.url, id).get();
    }

    function save(data) {

    }

    function update(data) {
        var partial = isPartialUpdate(arguments),
            method = partial ? 'patch' : 'put';


    }

    function search(query) {

    }

    function findAll(config) {
        var hasIds = !config,
            hasSort = hasIds;

        if (!hasIds) {
            // neither ids nor sort specification
            return this.rest.all(this.url).getList();
        } else {
            hasSort = !!config.sort;
        }

        // analyze if we want specific ids
    }

    // private
    function isPartialUpdate(args) {
        if (args.length === 2) {
            return args[2] === true;
        }
        return false;
    }

}
