'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('mailTo', function(){
    return {
      restrict: "EA",
      templateUrl: "partials/mailTo.html",
      scope: {},
      controller: function($scope, $element, $attrs, appConfig)
      {
        $scope.appConfig = appConfig;
      }
    };
  })
  .directive('creditDashboard', function(){
  	return {
  		link: function(scope, element, attrs)
	  	{

  		},
  		restrict: "EA",
  		templateUrl: "partials/creditDashboard.html",
  		scope: {},
        controller: function($scope, $element, $attrs, CreditBoard)
        {
           $scope.item = new CreditBoard({
              percentsYear: 22,
              inflation: 7,
              creditSum: 100000
            });
            // let's try different ways of watching after input
            var item = $scope.item;
            $scope.$watch('item.percentsYear', function(newValue, oldValue){
              item.updateAfterInputPercents(newValue, item.creditSum);
            });
        }
    };
  });
