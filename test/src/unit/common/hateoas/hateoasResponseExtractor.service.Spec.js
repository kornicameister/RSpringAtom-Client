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
      },
      collectionData     = {
        "links": {
          "self"  : {
            "href"     : "http://localhost:8080/data/user{?page,size,sort}",
            "templated": true
          },
          "search": {
            "href": "http://localhost:8080/data/user/search"
          }
        },
        "page" : {
          "size"         : 50,
          "totalElements": 2,
          "totalPages"   : 1,
          "number"       : 0
        },
        data   : [{
          id                     : 1,
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
        }, {
          id                     : 2,
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
          "links"                : {
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
    beforeEach(setUpCheck);

    it('should normalize entity request', function () {
      (function verify(data) {
        var expectedValue,
            value,
            expectedKeys = _.keys(entityData);

        expect(data).to.contain.all.keys(expectedKeys);

        expectedKeys.forEach(function (key) {
          expectedValue = entityData[key];
          value = data[key];
          expect(value).to.deep.equal(expectedValue);
        });

      }(extractor(entityResponse, 'GET', '/a/route')));
    });

    it('should normalize collection request', function () {
      (function verify(data) {
        var expectedValue,
            value,
            expectedKeys = _.keys(collectionData);

        expect(data).to.contain.all.keys(expectedKeys);

        expectedKeys.forEach(function (key) {
          expectedValue = collectionData[key];
          value = data[key];
          if (value instanceof Array) {
            expect(value).to.not.be.empty;
            value.forEach(function expectedArrayIt(item) {
              expect(item).to.contain.key('id');

              var index  = _.findIndex(collectionData['data'], function (it) {
                    return it.id === item.id;
                  }),
                  cdItem = collectionData['data'][index];

              expect(item).to.deep.equal(cdItem);

            })
          } else {
            expect(value).to.deep.equal(expectedValue);
          }
        });

      }(extractor(collectionResponse, 'GET', '/a/route')))
    });

    it('should throw HateoasResponseExtractionError for more then one embedded item', function () {
      expect((function () {
        extractor({
          _links   : {},
          _embedded: {
            a: [],
            b: []
          },
          page     : {}
        })
      })).to.throw(/Expected single key under/);
    });

    it('should return empty data array if empty _embedded', function () {
      (function verify(data) {
        expect(data['data']).to.be.empty;
      }(extractor({
        _links   : {},
        _embedded: {},
        page     : {}
      })))
    });

    function setUpCheck() {
      module('sg.common.hateoas');
      inject(function (_hateoasResponseExtractor_) {
        extractor = _hateoasResponseExtractor_;
      });
    }

  });

});
