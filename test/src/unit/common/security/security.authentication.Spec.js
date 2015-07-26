var expect = chai.expect;

describe('securityAuthentication', function () {
    var securityAuthentication;

    beforeEach(angular.mock.module('sg.common.security'));
    beforeEach(angular.mock.inject(function (_securityAuthentication_) {
        securityAuthentication = _securityAuthentication_;
    }));

    it('should return authenticated=false for undefined authentication', function () {
        expect(
            securityAuthentication(undefined).authenticated
        ).to.not.be.ok;
    });

    it('should return authenticated=false for null authentication', function () {
        expect(
            securityAuthentication(null).authenticated
        ).to.not.be.ok;
    });

    it('should return authenticated=true for valid authentication', function () {
        expect(
            securityAuthentication({
                password: {
                    email: 'test@gmail.com'
                }
            }).authenticated
        ).to.be.ok;
    })

});