'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
/*
angular.module('myApp.services', []).
  value('version', '0.1');
*/
var servicesModule = angular.module('myApp.services', []);
servicesModule.value('version', '0.1');

servicesModule.factory('credit', function() {
    var CreditCount = function CreditCount(creditCount){
       return {
        months: creditCount.months || 0,
        annuitetCoefficient: creditCount.annuitetCoefficient || 0,
        monthlyPay: creditCount.monthlyPay || 0,
        overpay: creditCount.overpay || 0,
        overpayPercentage: creditCount.overpayPercentage || 0,
        recentYearDifference: creditCount.recentYearDifference || 0
        };
    };

    var creditObj = {
        percentsYear: 2,
        //percentsMonth: 0,
        inflation: 0,
        percentsReal: 0,
        creditSum: 0,
        creditCounts: function()
        {
            var creditCountArray = [],
                monthsIterate = 12,
                i = 12,
                maxMonths = 300;
            for(; i <= 300; i += monthsIterate)
            {
                creditCountArray.push(new CreditCount({months: i}));
            }
            return creditCountArray;
        }()
    };
    creditObj.percentsMonth = creditObj.percentsYear / 12;
    return creditObj;
});
