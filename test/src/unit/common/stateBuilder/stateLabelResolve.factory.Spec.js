var expect = chai.expect,
    stub = sinon.stub,
    spy = sinon.spy;

describe('$stateLabelResolve', function () {
    var $stateLabelResolve,
        $state,
        labelService;

    beforeEach(angular.mock.module('sg.common.state', function ($provide) {
        labelService = {
            getLabel: function () {
            }
        };
        $provide.factory('labelService', function () {
            return labelService;
        });
    }));
    beforeEach(angular.mock.inject(function (_$stateLabelResolve_, _$state_) {
        $stateLabelResolve = _$stateLabelResolve_;
        $state = _$state_;
    }));

    it('it should have factory defined', function () {
        expect($stateLabelResolve).to.be.ok;
    });

    describe('check public API', function () {
        it('should have resolveLabel function', function () {
            var resolveLabel = $stateLabelResolve.resolveLabel;

            expect(resolveLabel).to.not.be.undefined;
            expect(resolveLabel).to.be.a('function');
        });
    });

    describe('check resolveLabel', function () {
        it('should return undefined for undefined state', function () {
            expect($stateLabelResolve.resolveLabel(undefined)).to.be.undefined;
        });
        it('should return undefined for missing definition in state', function () {
            expect($stateLabelResolve.resolveLabel({})).to.be.undefined;
        });
        it('should return undefined for valid definition but no explicitly defined label', function () {
            var state = {
                name: ''
            };
            expect($stateLabelResolve.resolveLabel(state)).to.be.undefined;
        });
        it('should return string for string defined label', function () {
            var label = 'Test',
                state = {
                    name   : '',
                    resolve: {
                        label: label
                    }
                };

            expect($stateLabelResolve.resolveLabel(state)).to.not.be.undefined;
            expect($stateLabelResolve.resolveLabel(state)).to.equal(label);
        });
        it('should return label for ordinary defined function', function () {
            var label = 'Test',
                labelFunc = function () {
                    return label;
                },
                state = {
                    name   : '',
                    resolve: {
                        label: labelFunc
                    }
                };

            spy(state.resolve, 'label');

            var actualLabel = $stateLabelResolve.resolveLabel(state);

            expect(actualLabel).to.not.be.undefined;
            expect(actualLabel).to.equal(label);

            expect(state.resolve.label).to.have.been.calledOnce;
        });
        it('should return label for DI defined function', function () {
            var label = 'Test',
                state = {
                    name   : '',
                    resolve: {
                        label: function (labelService) {
                            return labelService.getLabel();
                        }
                    }
                };

            stub(labelService, 'getLabel', function () {
                return label;
            });

            var actualLabel = $stateLabelResolve.resolveLabel(state);

            expect(actualLabel).to.not.be.undefined;
            expect(actualLabel).to.equal(label);

            expect(labelService.getLabel).to.have.been.calledOnce;
        });
        it('should return label for DI as ARRAY defined function', function () {
            var label = 'Test',
                state = {
                    name   : '',
                    resolve: {
                        label: ['labelService', function (a) {
                            return a.getLabel();
                        }]
                    }
                };

            stub(labelService, 'getLabel', function () {
                return label;
            });

            var actualLabel = $stateLabelResolve.resolveLabel(state);

            expect(actualLabel).not.to.be.undefined;
            expect(actualLabel).to.equal(label);

            expect(labelService.getLabel).to.have.been.calledOnce;
        });
    })
});
