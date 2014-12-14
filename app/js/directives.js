'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('creditDashboard', function(){
  	return {
  		link: function(scope, element, attrs)
	  	{

  		},
  		restrict: "EA",
  		templateUrl: "partials/creditDashboard.html",
  		scope: {},
      controller: function($scope, $element, $attrs)
        {
          var CreditCount = function CreditCount(creditCount){
              this.months = creditCount.months || 0;
              this.annuitetCoefficient = creditCount.annuitetCoefficient || 0;     
              this.monthlyPay = creditCount.monthlyPay || 0;
              this.totalPay = creditCount.totalPay || 0;
              this.overpay = creditCount.overpay || 0;
              this.overpayPercentage = creditCount.overpayPercentage || 0;
              this.recentYearDifference = creditCount.recentYearDifference || 0;
          };

          CreditCount.prototype.recalculate = function(monthlyPercent, creditAmount){
                 var power = Math.pow((1 + monthlyPercent), this.months);
                 this.annuitetCoefficient = monthlyPercent * power / (power - 1);
                 this.monthlyPay = creditAmount * this.annuitetCoefficient;
                 this.totalPay = this.monthlyPay * this.months;
                 this.overpay = this.totalPay - creditAmount;
                 this.overpayPercentage = (this.overpay / creditAmount) * 100;                 
                  };

          var Credit = function(settings){
            this.percentsYear = this.defaultSettings.percentsYear;
              this.inflation = this.defaultSettings.inflation;
              this.creditSum = this.defaultSettings.creditSum; 
            if(settings){
              this.percentsYear = settings.percentsYear || this.defaultSettings.percentsYear;
              this.inflation = settings.inflation || this.defaultSettings.inflation;
              this.creditSum = settings.creditSum || this.defaultSettings.creditSum;
            }
            
            this.percentsPerMonth = 0;
            this.updatePercentsMonth(this.percentsYear);
            this.creditCounts = this.creditCountsInit();
            this.recalculate(this.percentsYear, this.creditSum);
          };
          Credit.prototype = {
            monthsInYear: 12,
            //percentsYear: 0,
            percentsMonth: function(percents){ 
              this.updatePercentsMonth(percents);
              return this.percentsPerMonth * 100; 
            },
            //percentsPerMonth: function(){ return this.percentsMonth / 100; },
            //inflation: 0,
            percentsReal: function(percents, inflation)
            {
                return ((1 + percents / 100) / (1 + inflation / 100) - 1) * 100;
            },
            //creditSum: 0,
            creditCountsInit: function()
            {
                var creditCountArray = [],
                    monthsIterate = 12,
                    i = 12,
                    maxMonths = 300;
                for(; i <= 300; i += monthsIterate)
                {
                    var creditCountObj = new CreditCount({months: i});
                    creditCountObj.recalculate(this.percentsPerMonth, this.creditSum);
                    /*if(creditPrevious)
                    {
                        creditCountObj.recentYearDifference = creditCountObj.overpayPercentage - creditPrevious.overpayPercentage;
                    }*/
                    creditCountArray.push(creditCountObj);
                    var creditPrevious = creditCountObj;
                }
                return creditCountArray;
            },
            
            updatePercentsMonth: function(yearPercents){
              this.percentsPerMonth = yearPercents / this.monthsInYear / 100;
              
            },
            recalculate: function(percentsYear, creditSum){
              this.updatePercentsMonth(percentsYear);
              for(var i = 0; i < this.creditCounts.length; i++){
                this.creditCounts[i].recalculate(this.percentsPerMonth, creditSum);
                if(i > 0){
                  this.creditCounts[i].recentYearDifference = this.creditCounts[i].overpayPercentage - this.creditCounts[i-1].overpayPercentage;
                }
              } 
            }
          };
          Credit.prototype.defaultSettings = {
            percentsYear: 10,
            inflation: 1,
            creditSum: 100000
          };

           $scope.item = new Credit({
              percentsYear: 20,
              inflation: 7,
              creditSum: 100000
            });
        }
  	};
  });
