'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('mainCtrl', ['$scope', '$location', function($scope, $location) {
      $scope.go = function(url) {
          $location.ulr(url);
      };
  }]);
