'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('mainCtrl', ['$scope', 'credit',function($scope, credit) {
      /*
      $scope.credit = credit;  //
      $scope.credits = [];
      $scope.credits.push(new credit());
      $scope.addCredit = function(creditInsert)
      {
        $scope.credits.push(new creditInsert());
      };
      $scope.lastPercents = 0;
      $scope.countDifference = function (item) {
        if($scope.lastPercents === 0)
        {
          item.recentYearDifference = 0;
        }
        else {
          item.recentYearDifference = item.overpayPercentage - $scope.lastPercents;
        }
        $scope.lastPercents = item.overpayPercentage;
        return item.recentYearDifference;
      }*/
  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
