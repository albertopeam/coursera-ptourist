(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .component("sdTypesSelector", {
      templateUrl: typeSelectorTemplateUrl,
      controller: TypeSelectorController,
      bindings: {
        authz: "<"
      }
    })
    .component("sdTypesEditor", {
      templateUrl: typeEditorTemplateUrl,
      controller: TypeEditorController,
      bindings: {
        authz: "<"
      },
      require: {
        typesAuthz: "^sdTypesAuthz"
      }
    });

  typeSelectorTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function typeSelectorTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.type_selector_html;
  }
  typeEditorTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function typeEditorTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.type_editor_html;
  }

  TypeSelectorController.$inject = ["$scope",
                                     "$stateParams",
                                     "spa-demo.authz.Authz",
                                     "spa-demo.subjects.Type",
                                     "spa-demo.subjects.TypesAuthz"];
  function TypeSelectorController($scope, $stateParams, Authz, Type, TypesAuthz) {
    console.log("TypeSelectorController");
    var vm=this;
    vm.authz = TypesAuthz;

    vm.$onInit = function() {
      console.log("TypeSelectorController",$scope);
      $scope.$watch(function(){ return Authz.getAuthorizedUserId(); },
                    function(){
                      console.log("TypeSelectorController-watch-Authz.getAuthorizedUserId");
                      console.log("Authz", Authz.getAuthorizedUserId());
                      if (!$stateParams.id) {
                        vm.items = Type.query();
                        console.log(vm.items);
                      }
                    });
    }
    return;
    //////////////
  }

  TypeEditorController.$inject = ["$scope","$q",
                                   "$state", "$stateParams",
                                   "spa-demo.authz.Authz",
                                   "spa-demo.subjects.Type",
                                   "spa-demo.subjects.TypeLinkableThing",
                                   "spa-demo.subjects.TypeOfThingThing",
                                   "spa-demo.subjects.TypesAuthz"];
  function TypeEditorController($scope, $q, $state, $stateParams,
                                 Authz, Type, TypeLinkableThing, TypeOfThingThing
                               ,TypesAuthz) {
    var vm=this;
    vm.selected_linkables=[];
    vm.linkThings = linkThings;
    vm.removeLinks = removeLinks;
    vm.haveDirtyLinks = haveDirtyLinks;
    vm.authz = TypesAuthz;

    vm.$onInit = function() {
      console.log("TypeEditorController",$scope);
      $scope.$watch(function(){ return Authz.getAuthorizedUserId(); },
                    function(){
                      console.log("TypeEditorController-watch-getAuthorizedUserId");
                      if ($stateParams.id) {
                        reload($stateParams.id);
                      } else {
                        //newResource();
                      }
                    });
    }
    return;
    //////////////

    function reload(typeId) {
      var itemId = typeId ? typeId : vm.item.id;
      console.log("TypeEditorController-re/loading type", itemId);
      vm.item = Type.get({id:itemId});
      vm.linkable_things = TypeLinkableThing.query({type_of_thing_id:itemId});
      $q.all([vm.item.$promise]).catch(handleError);
    }

    function linkThings() {
      console.log("linkThings");
      var promises=[];
      angular.forEach(vm.selected_linkables, function(linkable){
        console.log("linking to:", linkable);
        var resource = TypeOfThingThing.save({thing_id:linkable}, {id:vm.item.id});
        promises.push(resource.$promise);
      });

      vm.selected_linkables=[];
      console.log("waiting for promises", promises);
      $q.all(promises).then(
        function(response){
          console.log("promise.all response", response);
          $scope.typeform.$setPristine();
          reload();
        },
        handleError);
    }

    function removeLinks() {
      console.log("removing thing to type of thing");
      var promises = [];
      angular.forEach(vm.item.things, function(thing){
        if (thing.toRemove) {
          console.log("toremove", thing);
          promises.push(TypeOfThingThing.delete({thing_id:thing.id, id:vm.item.id}));
        }
      });

      console.log("waiting for promises", promises);
      $q.all(promises).then(
        function(response){
          console.log("promise.all response", response);
          $scope.typeform.$setPristine();
          reload();
        },
        handleError);
    }

    function haveDirtyLinks() {
      if (vm.item === undefined || vm.item.things === undefined || vm.item.things == null) {
        return false;
      }
      for (var i=0; vm.item.things && i<vm.item.things.length; i++) {
        var thing = vm.item.things[i];
        if (thing.toRemove) {
          return true;
        }
      }
      return false;
    }

    function handleError(response) {
      console.log("TypeEditorController-error", response);
      if (response.data) {
        vm.item["errors"]=response.data.errors;
      }
      if (!vm.item.errors) {
        vm.item["errors"]={}
        vm.item["errors"]["full_messages"]=[response];
      }
      //$scope.typeform.$setPristine();
    }
  }


})();
