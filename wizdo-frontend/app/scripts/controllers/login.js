'use strict';

/**
 * @ngdoc function
 * @name wizdoFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wizdoFrontendApp
 */
// angular.module('wizdoFrontendApp')
//   .controller('LoginCtrl', function ($scope) {
    
//   });

angular.module('wizdoFrontendApp')
  .controller('LoginCtrl', ["$scope", "$location", "$window", "authenticationSvc",
  	function ($scope, $location, $window, authenticationSvc) {
    $scope.userInfo = null;
    $scope.login = function () {
        authenticationSvc.login($scope.username, $scope.password)
            .then(function (result) {
                $scope.userInfo = result;
                $location.path("/");
            }, function (error) {
                $window.alert("Invalid credentials");
                console.log(error);
            });
    };

    $scope.cancel = function () {
        $scope.username = "";
        $scope.password = "";
    };
}]);