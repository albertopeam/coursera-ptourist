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
                                     "spa-demo.subjects.Type"];
  function TypeSelectorController($scope, $stateParams, Authz, Type) {
    var vm=this;

    vm.$onInit = function() {
      console.log("TypeSelectorController",$scope);
      $scope.$watch(function(){ return Authz.getAuthorizedUserId(); },
                    function(){
                      if (!$stateParams.id) {
                        vm.items = Type.query();
                      }
                    });
    }
    return;
    //////////////
  }

  TypeEditorController.$inject = ["$scope","$q",
                                   "$state", "$stateParams",
                                   "spa-demo.authz.Authz",
                                   "spa-demo.subjects.Type"
                                   ];
  function TypeEditorController($scope, $q, $state, $stateParams,
                                 Authz, Type) {
    var vm=this;

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
      $q.all([vm.item.$promise])
        .then(function(result){
          console.log("TypeEditorController-", result);
        })
        .catch(handleError);
    }

    function clear() {
      console.log("TypeEditorController-clear");
      $state.go(".", {id:null});
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
