angular.module('myApp.directives')
    .directive('paymentsTimetable', function(){
  	return {
  		link: function(scope, element, attrs)
	  	{

  		},
  		restrict: "EA",
  		templateUrl: "js/directives/paymentsTimetable/payments.html",
  		scope: {},
        controller: ['$scope', '$element', '$attrs', 'CreditBoard', function($scope, $element, $attrs, CreditBoard)
        {
           $scope.board = new CreditBoard({
              percentsYear: 22,
              inflation: 7,
              creditSum: 100000
            });
            // let's try different ways of watching after input
            var board = $scope.board;
            $scope.$watch('board.percentsYear', function(newValue, oldValue){
              board.updateAfterInputPercents(newValue, board.creditSum);
            });
        }]
    };
  });