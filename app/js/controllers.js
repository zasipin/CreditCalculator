'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('Main', ['$scope', 'credit',function($scope, credit) {
      $scope.credits = [credit];
      $scope.addCredit = function(){ $scope.credits.push(credit); };
  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
