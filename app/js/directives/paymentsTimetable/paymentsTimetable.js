angular.module('myApp.directives')
    .directive('paymentsTimetable', function(){
  	return {
  		link: function(scope, element, attrs)
	  	{

  		},
  		restrict: "EA",
  		templateUrl: "js/directives/paymentsTimetable/payments.html",
  		scope: {
            months: "@"
        },
        controller: ['$scope', '$element', '$attrs', 'CreditBoard', function($scope, $element, $attrs, CreditBoard)
        {
            $scope.payments = [];
            $scope.months = +$scope.months;
            for(var i = 1; i <= $scope.months; i++)
            {
                $scope.payments.push(i);
            }
            // let's try different ways of watching after input
        }]
    };
  });