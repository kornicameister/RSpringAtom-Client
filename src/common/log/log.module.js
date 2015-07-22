module.exports = require('angular')
  .module('sg.common.log', [])
  .constant('LOG_PRIORITY', require('./log_priotity.constant'))
  .factory('loggerLevels', require('./logger.levels'))
  .service('loggerFactory', require('./logger.factory'))
  .config(require('./log.decorator'))
  .run(['loggerLevels', 'DEBUG_MODE', printLogLevelsIfDebug]);

function printLogLevelsIfDebug(loggerLevels, DEBUG_MODE) {
  if (DEBUG_MODE) {
    console.log('LoggerLevels =>' + loggerLevels);
  }
}
