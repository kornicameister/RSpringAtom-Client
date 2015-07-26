angular.module('sg.common.hateoas').factory('hateoasResponseExtractor', ['hateoasConfig', 'loggerFactory', extractor]);

function extractor(hateoasConfig, loggerFactory) {
  var logger           = loggerFactory('hateoasResponseExtractor'),
      keysReplacements = configureKeyReplacement();

  return function responseExtractor(data, operation, route, url, response, deferred) {
    logger.log(_.format('Call {route} intercepted, applying hateoas rules', {
      route: route
    }));

    if (isEntityRequest(data)) {
      return normalizeEntity(data);
    }
    return data;
  };

  function configureKeyReplacement() {
    var keys = {};

    keys[hateoasConfig.linksRel()] = 'links';
    keys[hateoasConfig.pageRel()] = 'page';
    keys[hateoasConfig.embeddedRel()] = 'content';
    keys[hateoasConfig.selfRel()] = 'self';

    return keys;
  }

  function isEntityRequest(data) {
    return hateoasConfig.linksRel() in data;
  }

  function normalizeEntity(data) {
    var keys        = _.keys(data),
        metaKeys    = [
          hateoasConfig.linksRel()
        ],
        contentKeys = _.remove(_.clone(keys), function (key) {
          return _.indexOf(metaKeys, key) < 0;
        }),
        newData     = _.pick(data, contentKeys);

    newData[keysReplacements[hateoasConfig.linksRel()]] = data[hateoasConfig.linksRel()];
    newData['id'] = getIdFromUrl(_.get(data, hateoasConfig.linksRel() + '.' + hateoasConfig.selfRel()));

    return newData;
  }

  function normalizeCollection() {

  }

  function getIdFromUrl(url) {
    var last = _.last(url.href.split('/'));
    try {
      return Number(last);
    } catch (err) {
    }
    return last;
  }
}
