angular
  .module('sg.common.hateoas', [
    'sg.common.log',
    'sg.common.utils',
    'restangular'
  ])
  .config(function (hateoasConfigProvider) {
    hateoasConfigProvider.setDataEndPoint('/');
  })
  .run(function (Restangular, hateoasResponseExtractor) {
    Restangular.addResponseInterceptor(hateoasResponseExtractor);
    Restangular.setRestangularFields({
      id      : "id",
      selfLink: "links.self.href"
    });
  });