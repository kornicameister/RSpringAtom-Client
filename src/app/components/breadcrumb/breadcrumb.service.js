(function (module) {
    module.factory('breadcrumbService', ['$state', '$stateHelper', '$q', 'logger', service]);

    function service($state, $stateHelper, $q, loggerFactory) {
        var service = {},
            logger = loggerFactory('breadcrumbService');

        // API
        service.newCrumb = newCrumb;
        service.getBreadcrumbs = getBreadcrumb;

        return service;

        function getBreadcrumb(state) {
            return $q(function (resolve) {
                var newCrumbs = [],
                    stateName = state.name,
                    breadcrumbs = state['breadcrumb'] || [];

                if (state.abstract) {
                    logger.warn(_.format('getBreadcrumb(...) called initially with abstract state, state={state}', {
                        state: stateName
                    }));
                    resolve(newCrumb);
                }

                if (breadcrumbs.length) {
                    logger.debug(_.format('state {name} has inline breadcrumbs defined, returning it...', {name: stateName}));
                    _.forEach(breadcrumbs, function (crumbPath) {
                        newCrumbs.push(newCrumb(crumbPath, stateName));
                    });
                } else {
                    var tmp = stateName;
                    do {
                        tmp = $state.get(tmp);
                        if ((_.isNull(tmp) || _.isUndefined(tmp)) || tmp.abstract) {
                            break;
                        }
                        newCrumbs.push(newCrumb(tmp, stateName));

                        tmp = tmp.name;
                        tmp = tmp.replace(/(\.[^.]*)$/gi, '');
                    } while (tmp);

                    newCrumbs.reverse();
                }

                // resolve pending promises for label
                var prms = [];
                _.forEachRight(newCrumbs, function (nc) {
                    prms.push(nc.label.then(function (label) {
                        var self = this;
                        self.label = label;
                        return self;
                    }.bind(nc)));
                });

                $q.all(prms).then(function (newCrumbs) {
                    resolve(newCrumbs.reverse());
                });
            })
        }

        function newCrumb(stateName, activeStateName) {
            var state;

            if (_.isString(stateName)) {
                state = $state.get(stateName);
            } else {
                state = stateName;
                stateName = $stateHelper.getStateName(state);
            }

            if (!state) {
                throw new Error('breadcrumbService :: ' + stateName + ' has no corresponding state defined');
            }

            return {
                state : state,
                label : $stateHelper.getStateLabel(state),
                active: stateName === activeStateName
            };
        }
    }
}(angular.module('sg.app.components.breadcrumb')));