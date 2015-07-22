angular
    .module('sg.common.data')
    .factory('DataResource', function (DEBUG_MODE, DATA_END_POINT) {
      var baseUrl;

      if (_.endsWith(DATA_END_POINT, '/') && '/' !== DATA_END_POINT) {
        baseUrl = baseUrl.substr(0, baseUrl.lastIndexOf('/'));
      }

      function DataResource(config){
        _.assign(this, config);
      }

      DataResource.prototype = {
        getOne: getOne,
        findAll: findAll
      };

      return DataResource;

      function getOne(id) {
        return this.rest.one(this.url, id).get();
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

    });
