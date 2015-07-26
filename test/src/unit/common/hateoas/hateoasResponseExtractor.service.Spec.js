var expect = chai.expect;

describe('sg.common.hateoas - hateoasResponseExtractor', function () {
  var extractor,
      entityResponse     = {
        "createdDate"          : "2015-07-28T20:04:04.149Z",
        "lastModifiedDate"     : "2015-07-28T20:04:04.149Z",
        "version"              : 0,
        "enabled"              : true,
        "accountNonExpired"    : true,
        "accountNonLocked"     : true,
        "credentialsNonExpired": true,
        "username"             : "SYSTEM",
        "password"             : "$2a$10$g.1zOxQ9BiCQCwkIhicntuWAwL8qOqPIaNMgFuIATHp59XahhMKxK",
        "email"                : "system@springatom.com",
        "_links"               : {
          "self"          : {
            "href": "http://localhost:8080/data/user/1"
          },
          "createdBy"     : {
            "href": "http://localhost:8080/data/user/1/createdBy"
          },
          "lastModifiedBy": {
            "href": "http://localhost:8080/data/user/1/lastModifiedBy"
          }
        }
      },
      entityData         = {
        "id"                   : 1,
        "createdDate"          : "2015-07-28T20:04:04.149Z",
        "lastModifiedDate"     : "2015-07-28T20:04:04.149Z",
        "version"              : 0,
        "enabled"              : true,
        "accountNonExpired"    : true,
        "accountNonLocked"     : true,
        "credentialsNonExpired": true,
        "username"             : "SYSTEM",
        "password"             : "$2a$10$g.1zOxQ9BiCQCwkIhicntuWAwL8qOqPIaNMgFuIATHp59XahhMKxK",
        "email"                : "system@springatom.com",
        "links"                : {
          "self"          : {
            "href": "http://localhost:8080/data/user/1"
          },
          "createdBy"     : {
            "href": "http://localhost:8080/data/user/1/createdBy"
          },
          "lastModifiedBy": {
            "href": "http://localhost:8080/data/user/1/lastModifiedBy"
          }
        }
      },
      collectionResponse = {
        "_links"   : {
          "self"  : {
            "href"     : "http://localhost:8080/data/user{?page,size,sort}",
            "templated": true
          },
          "search": {
            "href": "http://localhost:8080/data/user/search"
          }
        },
        "_embedded": {
          "users": [{
            "createdDate"          : "2015-07-28T20:04:04.149Z",
            "lastModifiedDate"     : "2015-07-28T20:04:04.149Z",
            "version"              : 0,
            "enabled"              : true,
            "accountNonExpired"    : true,
            "accountNonLocked"     : true,
            "credentialsNonExpired": true,
            "username"             : "SYSTEM",
            "password"             : "$2a$10$g.1zOxQ9BiCQCwkIhicntuWAwL8qOqPIaNMgFuIATHp59XahhMKxK",
            "email"                : "system@springatom.com",
            "_links"               : {
              "self"          : {
                "href": "http://localhost:8080/data/user/1"
              },
              "createdBy"     : {
                "href": "http://localhost:8080/data/user/1/createdBy"
              },
              "lastModifiedBy": {
                "href": "http://localhost:8080/data/user/1/lastModifiedBy"
              }
            }
          }, {
            "createdDate"          : "2015-07-28T20:04:04.357Z",
            "lastModifiedDate"     : "2015-07-28T20:04:04.357Z",
            "version"              : 0,
            "enabled"              : true,
            "accountNonExpired"    : true,
            "accountNonLocked"     : true,
            "credentialsNonExpired": true,
            "username"             : "kornicameister",
            "password"             : "$2a$10$Lk30.498/gwSaFxlJGWYc.FpBwpaTyPG5jD6oPh3Ko0Q9Glhjj.pC",
            "email"                : "kornicameister@gmail.com",
            "_links"               : {
              "self"          : {
                "href": "http://localhost:8080/data/user/2"
              },
              "createdBy"     : {
                "href": "http://localhost:8080/data/user/2/createdBy"
              },
              "lastModifiedBy": {
                "href": "http://localhost:8080/data/user/2/lastModifiedBy"
              }
            }
          }]
        },
        "page"     : {
          "size"         : 50,
          "totalElements": 2,
          "totalPages"   : 1,
          "number"       : 0
        }
      };

  context('check', function () {

    beforeEach(function setUpCheck() {
      module('sg.common.hateoas');

      inject(function (_hateoasResponseExtractor_) {
        extractor = _hateoasResponseExtractor_;
      });
    });

    it('should be defined', function () {
      expect(extractor).to.be.ok;
    });
  });

  context('logic', function () {
    var $httpBackend,
        Restangular;

    beforeEach(setUpCheck);
    afterEach(tearDownCheck);

    it('should normalize entity requst', function () {
      $httpBackend
        .when('GET', '/user/1')
        .respond(entityResponse, {
          Accept: 'application/json'
        });

      $httpBackend.expectGET('/user/1');
      Restangular
        .one('user', 1)
        .get()
        .then(function (data) {

          _.keys(entityData).forEach(function (key) {
            // TODO checkup aint working
            expect(data).to.have.property(key, 'Data does not have property ' + key);
          });

        })
        .then(function () {
          expect(extractor.extractor).to.have.been.calledOnce;
        });
      $httpBackend.flush();
    });

    function tearDownCheck() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    }

    function setUpCheck() {
      module('sg.common.hateoas');

      inject(function (_hateoasResponseExtractor_, _Restangular_, $injector) {
        extractor = {
          extractor: _hateoasResponseExtractor_
        };
        Restangular = _Restangular_;
        $httpBackend = $injector.get('$httpBackend');

        sinon.spy(extractor, 'extractor');
        Restangular.setResponseExtractor(extractor.extractor);
      });
    }

  });

});
