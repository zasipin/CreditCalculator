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
        controller: ['$scope', '$element', '$attrs', 'creditData', 'creditCalculator', 'CreditCountPayments' , function($scope, $element, $attrs, creditData, creditCalculator, CreditCountPayments)
        {
            var calculator = creditCalculator.getInstance(),
                credit, 
                prevCredit = new CreditCountPayments({months: 0, annualPercent: 0, creditAmount: 0}),
                percentsYear = creditData.percents,
                creditSum = creditData.creditSum,
                paymentToCredit = 0,
                updateCretidPayments = function(creditPayment){
                    var payment = creditPayment || {},
                        credits, 
                        credit;
                    
                    if(payment instanceof CreditCountPayments)
                    {
                        payment.recalculate(payment.annualPercent, payment.creditAmount, payment.extraPayment);

                        for(var i = 1; i < $scope.payments.length; i++)
                        {
                            //$scope.payments[i].recalculate($scope.payments[i-1].annualPercent, $scope.payments[i-1].creditAmount - $scope.payments[i-1].paymentToCredit - $scope.payments[i-1].extraPayment);
                            $scope.payments[i].recalculate($scope.payments[i-1].annualPercent, $scope.payments[i-1].leftToPay);
                        }
                    }
                };
            
            $scope.payments = [];
            $scope.months = +$scope.months;
            
            $scope.updatePayments = function(creditPayment){
                updateCretidPayments(creditPayment);
                console.log(creditPayment.extraPayment);
            };
            
            for(var i = $scope.months; i > 0; i--)
            {
                creditSum = creditSum - paymentToCredit;
                credit = new CreditCountPayments({months: i, annualPercent: percentsYear, creditAmount: creditSum});
                calculator.addCredit(credit);
                prevCredit = credit;
                paymentToCredit = credit.monthlyPay - percentsYear * creditSum / 100 / 12;
            }
            
            $scope.payments = calculator.getCredits();
            // let's try different ways of watching after input
        }]
    };
  });