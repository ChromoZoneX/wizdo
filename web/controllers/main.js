'use strict';

/**
 * @ngdoc function
 * @name wizdoFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wizdoFrontendApp
 */
angular.module('wizdoFrontendApp')
  .controller('MainCtrl', function ($scope) {

  });
// angular.module('wizdoFrontendApp')
//   .controller('MainCtrl',["$scope", "$location", "authenticationSvc", "auth",
//   	function ($scope, $location, authenticationSvc, auth) {
//  $scope.userInfo = auth;

//     $scope.logout = function () {

//         authenticationSvc.logout()
//             .then(function (result) {
//                 $scope.userInfo = null;
//                 $location.path("/login");
//             }, function (error) {
//                 console.log(error);
//             });
//     };
//   });
