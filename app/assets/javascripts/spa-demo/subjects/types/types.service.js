(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .factory("spa-demo.subjects.Type", TypeFactory);

  TypeFactory.$inject = ["$resource","spa-demo.config.APP_CONFIG"];
  function TypeFactory($resource, APP_CONFIG) {
    var service = $resource(APP_CONFIG.server_url + "/api/type_of_things/:id",
        { id: '@id'}
      );
    return service;
  }
})();
