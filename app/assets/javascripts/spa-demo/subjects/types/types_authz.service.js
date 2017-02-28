(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .factory("spa-demo.subjects.TypesAuthz", TypesAuthzFactory);

  TypesAuthzFactory.$inject = ["spa-demo.authz.Authz",
                                "spa-demo.authz.BasePolicy"];
  function TypesAuthzFactory(Authz, BasePolicy) {
    console.log("TypesAuthzFactory");
    function TypesAuthz() {
      BasePolicy.call(this, "TypeOfThing");
    }
    TypesAuthz.prototype = Object.create(BasePolicy.prototype);
    TypesAuthz.constructor = TypesAuthz;

    TypesAuthz.prototype.canQuery=function() {
      var can = Authz.isAuthenticated();
      console.log("TypesAuthz.canQuery: ", can);
      return can;
    };

    TypesAuthz.prototype.canModify=function() {
      var can = Authz.isThingOrganizer();
      console.log("TypesAuthz.canModify", can);
      return can;      
    };

    return new TypesAuthz();
  }
})();
