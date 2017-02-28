(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .factory("spa-demo.subjects.TypeOfThingThing", TypeOfThingThing);

  TypeOfThingThing.$inject = ["$resource", "spa-demo.config.APP_CONFIG"];
  function TypeOfThingThing($resource, APP_CONFIG) {
    return $resource(APP_CONFIG.server_url + "/api/things/:thing_id/type_of_things/:id");
  }

})();
