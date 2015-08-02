angular.module('sg.common.hateoas').factory('hateoasResponseExtractor', ['hateoasConfig', 'loggerFactory', extractor]);

function extractor(hateoasConfig, loggerFactory) {
  var logger           = loggerFactory('hateoasResponseExtractor'),
      keysReplacements = configureKeyReplacement();

  function HateoasResponseExtractionError(message) {
    this.message = (message || "");
  }

  HateoasResponseExtractionError.prototype = new Error();

  return function responseExtractor(data, operation, route, url, response, deferred) {
    logger.log(_.format('Call {route} intercepted, applying hateoas rules', {
      route: route
    }));

    if (isEntityRequest(data)) {
      logger.debug('Normalizing entity request');
      return normalizeEntity(data);
    }
    logger.debug('Normalizing collection request');
    return normalizeCollection(data);
  };

  function configureKeyReplacement() {
    var keys = {};

    keys[hateoasConfig.linksRel()] = 'links';
    keys[hateoasConfig.pageRel()] = 'page';
    keys[hateoasConfig.embeddedRel()] = 'data';
    keys[hateoasConfig.selfRel()] = 'self';

    return keys;
  }

  function isEntityRequest(data) {
    return !(hateoasConfig.embeddedRel() in data);
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

  function normalizeCollection(data) {
    var embeddedItems = pickUpNestedEmbedded(data[hateoasConfig.embeddedRel()]),
        items         = [],
        respone       = {};
    _.forEachRight(embeddedItems, function dataItemIterator(item) {
      items.push(normalizeEntity(item));
    });

    respone[keysReplacements[hateoasConfig.embeddedRel()]] = items;
    respone[keysReplacements[hateoasConfig.pageRel()]] = data[hateoasConfig.pageRel()];
    respone[keysReplacements[hateoasConfig.linksRel()]] = data[hateoasConfig.linksRel()];

    return respone;
  }

  function pickUpNestedEmbedded(embedded) {
    var keys = _.keys(embedded);
    if (keys.length > 1) {
      throw new HateoasResponseExtractionError(
        _.format('Expected single key under {e} but located following keys: {k}', {
          e: hateoasConfig.embeddedRel(),
          k: keys.toString()
        })
      )
    } else if (keys.length == 0) {
      logger.debug('Empty embedded response');
      return [];
    }
    return embedded[keys[0]];
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
