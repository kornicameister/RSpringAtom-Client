function moduleUnitTest(name, requiredDependencies, logicTestFn) {
    var expect = chai.expect;

    describe(name + ' module', function () {
        var module;

        before(function getModule() {
            module = angular.module(name);
        });

        it("should be registered", function () {
            expect(module).not.to.equal(null);
        });

        context('dependencies', function () {
            var deps;

            before(function () {
                deps = module.value(name).requires;
            });

            requiredDependencies.forEach(function (dep) {
                it('should have dependency on module ' + dep, function () {
                    expect(hasModule(dep), 'No dependency for module ' + dep).to.equal(true);
                });
            });

            function hasModule(m) {
                return deps.indexOf(m) >= 0;
            }
        });

        if (logicTestFn) {
            context('logic', logicTestFn);
        }
    });

}