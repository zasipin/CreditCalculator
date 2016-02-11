'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('mainCtrl', ['$scope', function($scope) {

  }])
  .controller('paymentsController', ['$scope', '$routeParams', function($scope, $routeParams) {
      $scope.months = $routeParams.months;
  }]);

