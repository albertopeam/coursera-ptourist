(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .directive("sdTypesAuthz", TypesAuthzDirective);

  TypesAuthzDirective.$inject = [];

  function TypesAuthzDirective() {
    var directive = {
        bindToController: true,
        controller: TypeAuthzController,
        controllerAs: "vm",
        restrict: "A",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
      console.log("TypesAuthzDirective", scope);
    }
  }

  TypeAuthzController.$inject = ["$scope",
                                  "spa-demo.subjects.TypesAuthz"];
  function TypeAuthzController($scope, TypesAuthz) {
    console.log("TypeAuthzController");
    var vm = this;
    vm.authz={};
    vm.newItem=newItem;

    activate();
    return;
    ////////////
    function activate() {
      console.log("TypeAuthzController-activate");
      vm.newItem(null);
    }

    function newItem(item) {
      console.log("TypesAuthzDirective-newItem", item);
      TypesAuthz.getAuthorizedUser().then(
        function(user){ authzUserItem(item, user); },
        function(user){ authzUserItem(item, user); });
    }

    function authzUserItem(item, user) {
      console.log("TypeAuthzController-new Item/Authz", item, user);

      vm.authz.authenticated = TypesAuthz.isAuthenticated();
      vm.authz.canQuery      = TypesAuthz.canQuery();
      vm.authz.canModify      = TypesAuthz.canModify();
      
      console.log("checkAccess", item, vm.authz);
    }
  }
})();
