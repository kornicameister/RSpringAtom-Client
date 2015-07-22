require('./action-item.less');

module.exports = function () {
  var templateMap = {
        button   : require('./action-item-button.tpl.html'),
        search   : require('./action-item-search.tpl.html'),
        seperator: require('./action-item-separator.tpl.html')
      };

  return {
      restrict   : 'E',
      scope      : {
          type  : '@',
          action: '&'
      },
      controller : 'ActionItemController',
      templateUrl: getTemplateUrl
  };

  function getTemplateUrl(el, attrs) {
      return templateMap[attrs.type];
  }

};
