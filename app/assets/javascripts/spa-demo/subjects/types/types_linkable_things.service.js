(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .factory("spa-demo.subjects.TypeLinkableThing", TypeLinkableThing);

  TypeLinkableThing.$inject = ["$resource", "spa-demo.config.APP_CONFIG"];
  function TypeLinkableThing($resource, APP_CONFIG) {
    return $resource(APP_CONFIG.server_url + "/api/type_of_things/:type_of_thing_id/linkable_things");
  }

})();
