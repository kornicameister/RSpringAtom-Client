angular
    .module('sg.common.hateoas')
    .constant('LINKS_REL','_links')
    .constant('SELF_REL', 'self')
    .constant('EMBEDDED_REL', '_embedded')
    .constant('PAGE_REL', '_page')
    .factory('HateoasResource', function (DEBUG_MODE, DATA_END_POINT) {
      var baseUrl;

      if (_.endsWith(DATA_END_POINT, '/') && '/' !== DATA_END_POINT) {
        baseUrl = baseUrl.substr(0, baseUrl.lastIndexOf('/'));
      }

      function HateoasResource(config){
        _.assign(this, config);
      }

      HateoasResource.prototype = {
        getOne: getOne,
        save: save,
        update: update,
        delete: delete,
        findAll: findAll,
        find: find
      };

      return HateoasResource;

      function getOne(id) {
        return this.rest.one(this.url, id).get();
      }

      function save(data) {

      }

      function update(data){
        var partial = isPartialUpdate(arguments),
            method = partial ? 'patch' : 'put';


      }

      function search(query){

      }

      function findAll(config){
        var hasIds = !config,
            hasSort = hasIds;

        if(!hasIds) {
          // neither ids nor sort specification
          return this.rest.all(this.url).getList();
        } else {
          hasSort = !!config.sort;
        }

        // analyze if we want specific ids
      }

      // private
      function isPartialUpdate(args){
        if(args.length === 2){
          return args[2] === true;
        }
        return false;
      }

    });
