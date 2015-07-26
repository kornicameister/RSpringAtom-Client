var expect = chai.expect;

describe('sgBreadcrumb directive', function () {
    var scope,
        element,
        breadcrumbService,
        q;

    beforeEach(setUp);

    describe('empty crumbs', function () {

        beforeEach(initWithCrumbs([]));

        it('should heave sg-breadcrumb header defined', function () {
            var header = element.find('header');
            expect(header.length).to.equal(1);
        });

        it('should have no li elements', function () {
            var liEls = element.find('li');
            expect(liEls.length).to.equal(1);
        });

        afterEach(function () {
            scope.$destroy();
            breadcrumbService = undefined;
        });
    });

    describe('crumbs provided', function () {
        var length = 10;

        beforeEach(initWithCrumbs(length));

        it('should have 10 li elements', function () {
            var liEls = $(element[0]).find('li');
            expect(liEls.length).to.equal(length + 1); // including home crumb
        });
        it('should have at least one active crumb', function () {
            var liEls = $(element[0]).find('li.active');
            expect(liEls.length).to.equal(1);
        });

        afterEach(function () {
            scope.$destroy();
            breadcrumbService = undefined;
        });
    });

    function setUp() {
        angular.mock.module('templates');
        angular.mock.module('sg.app.components.breadcrumb');
        angular.mock.module(function ($provide) {
            $provide.factory('breadcrumbService', function () {
                return breadcrumbService = {
                    newCrumb      : function () {

                    },
                    getBreadcrumbs: function () {

                    }
                }
            });
        });
    }

    function initWithCrumbs(length) {
        return angular.mock.inject(function ($rootScope, $compile, $q, breadcrumbService) {
            var crumbs = length && length > 0 ? mockCrumbs(length) : [];
            scope = $rootScope.$new();
            q = $q;

            sinon.stub(breadcrumbService, 'getBreadcrumbs', function () {
                return q(function (resolve) {
                    resolve(crumbs);
                })
            });

            element = angular.element('<sg-breadcrumb></sg-breadcrumb>');

            $compile(element)(scope);
            scope.$digest();
        });
    }

    function mockCrumbs(count) {
        var arr = [];
        while (count--) {
            arr.push({
                active: count - 1 === 0,
                label : 'Crumb[' + count + ']'
            })
        }
        return arr;
    }
});
