angular
    .module('sg.common.hateoas')
    .factory('Page', function(){
      function Page(data) {
        
      }

      Page.prototype = {
        next : nextPage,
        prev : prevPage,
        has  : hasPages,
        total: totalPages,
        size : pageSize
      }
    });
