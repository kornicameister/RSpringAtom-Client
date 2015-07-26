var expect = chai.expect;

describe('sg.common.hateoas - hateoasConfig', function () {
    var provider;
    context('defaults', function () {

        beforeEach(module('sg.common.hateoas', function (hateoasConfigProvider) {
            provider = hateoasConfigProvider;
        }));

        it('should have dataPoint default to \'/\'', inject(function () {
            expect(provider.$get().dataEndPoint()).to.be.equal('/');
        }));

        it('should have linksRel default to _links', inject(function () {
            expect(provider.$get().linksRel()).to.be.equal('_links');
        }));

        it('should have selfRel default to self', inject(function () {
            expect(provider.$get().selfRel()).to.be.equal('self');
        }));

        it('should have embeddedRel default to _embedded', inject(function () {
            expect(provider.$get().embeddedRel()).to.be.equal('_embedded');
        }));

        it('should have pageRel default to page', inject(function () {
            expect(provider.$get().pageRel()).to.be.equal('page');
        }));
    });

    context('non-defaults', function () {

        beforeEach(module('sg.common.hateoas', function (hateoasConfigProvider) {
            provider = hateoasConfigProvider;
        }));

        it('should have dataPoint', inject(function () {
            var val = 'http://test.org/';
            provider.setDataEndPoint(val);
            expect(provider.$get().dataEndPoint()).to.be.equal('http://test.org');
        }));

        it('should have linksRel', inject(function () {
            var val = 'MOCKED_CONSTANT';
            provider.setLinksRel(val);
            expect(provider.$get().linksRel()).to.be.equal(val);
        }));

        it('should have selfRel', inject(function () {
            var val = 'MOCKED_CONSTANT';
            provider.setSelfRel(val);
            expect(provider.$get().selfRel()).to.be.equal(val);
        }));

        it('should have embeddedRel', inject(function () {
            var val = 'MOCKED_CONSTANT';
            provider.setEmbeddedRel(val);
            expect(provider.$get().embeddedRel()).to.be.equal(val);
        }));

        it('should have pageRel', inject(function () {
            var val = 'MOCKED_CONSTANT';
            provider.setPageRel(val);
            expect(provider.$get().pageRel()).to.be.equal(val);
        }));
    });

});