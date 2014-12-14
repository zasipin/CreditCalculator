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
        annuitetCoefficient: function(monthlyPercent, creditAmount){
           var power = Math.pow((1 + monthlyPercent), this.months);
           var coeff = monthlyPercent * power / (power - 1);
           this.monthlyPay = creditAmount * coeff;
           this.totalPay = this.monthlyPay * this.months;
           this.overpay = this.totalPay - creditAmount;
           this.overpayPercentage = (this.overpay / creditAmount) * 100;
           return coeff;
            },
        monthlyPay: creditCount.monthlyPay || 0,
        totalPay: creditCount.totalPay || 0,
        overpay: creditCount.overpay || 0,
        overpayPercentage: creditCount.overpayPercentage || 0,
        recentYearDifference: creditCount.recentYearDifference || 0
        };
    };
    var creditObj = function(){};
    creditObj.prototype = {
        monthsInYear: 12,
        percentsYear: 20,
        percentsMonth: function(percents){ return percents / 12 },
        percentsPerMonth: 0,
        inflation: 7,
        percentsReal: function(percents, inflation)
        {
            return ((1 + percents / 100) / (1 + inflation / 100) - 1) * 100;

        },
        creditSum: 100000,
        creditCounts: function()
        {
            var creditCountArray = [],
                monthsIterate = 12,
                i = 12,
                maxMonths = 300;
            for(; i <= 300; i += monthsIterate)
            {
                var creditCountObj = new CreditCount({months: i});
                if(creditPrevious)
                {
                    creditCountObj.recentYearDifference = creditCountObj.overpayPercentage - creditPrevious.overpayPercentage;
                }
                creditCountArray.push(creditCountObj);
                var creditPrevious = creditCountObj;
            }
            return creditCountArray;
        }()
    };
    creditObj.prototype.updatePercentsMonth = function(yearPercents){
          this.percentsPerMonth = yearPercents / this.monthsInYear / 100;
          return this.percentsPerMonth;
    };
    return creditObj;
});
