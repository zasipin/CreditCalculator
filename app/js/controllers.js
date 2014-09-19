'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('Main', ['$scope', 'credit',function($scope, credit) {
      $scope.credits = [];
      $scope.credits.push(credit);
      $scope.addCredit = function(creditInsert)
      {
        $scope.credits.push(creditInsert);
      };
  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
