var Class = require('jsface').Class,
    constant = require('lodash/utility/constant');

module.exports =  constant(Class([], {
    bindToController: true,
    controllerAs    : 'vm',
    scope           : true,
    constructor     : function (cfg) {
      if (cfg.bindToController) {
          delete cfg.bindToController;
      }
      _.defaults(this, cfg);
      return this;
    }
}));
