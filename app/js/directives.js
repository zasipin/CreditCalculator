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
      controller: function($scope, $element, $attrs, localStorageService)
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
            settings = angular.extend({}, this.defaultSettings, settings);
            // get data from local storage
            settings.percentsYear = localStorageService.get('percentsYear') || settings.percentsYear;
            settings.creditSum = localStorageService.get('creditSum') || settings.creditSum;

            this.percentsYear = settings.percentsYear;
            this.inflation = settings.inflation;
            this.creditSum = settings.creditSum;
            this.countYears = settings.countYears;

            this.percentsYearSlide = this.percentsYear;
            this.percentsPerMonth = 0;
            this.updatePercentsMonth(this.percentsYear);
            this.creditCounts = this.creditCountsInit();
            this.recalculate(this.percentsYear, this.creditSum);

            var self = this;
            $scope.$watch('item.percentsYear', function(newValue, oldValue){
              self.updateAfterInputPercents(newValue, self.creditSum);
            });
          };
          Credit.prototype = {
            monthsInYear: 12,
            percentsMonth: function(percents){ 
              this.updatePercentsMonth(percents);
              return this.percentsPerMonth * 100; 
            },
            percentsReal: function(percents, inflation)
            {
                return ((1 + percents / 100) / (1 + inflation / 100) - 1) * 100;
            },
            creditCountsInit: function()
            {
                var creditCountArray = [],
                    monthsIterate = 12,
                    i = 12,
                    maxMonths = this.monthsInYear * this.countYears;
                for(; i <= 300; i += monthsIterate)
                {
                    var creditCountObj = new CreditCount({months: i});
                    creditCountObj.recalculate(this.percentsPerMonth, this.creditSum);
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
              // update local storage
              localStorageService.set('creditSum', creditSum);
              localStorageService.set('percentsYear', percentsYear); 
            },
            updateAfterInputPercents: function(percentsYear, creditSum){
              this.percentsYearSlide = percentsYear;
              this.recalculate(percentsYear, creditSum);
            },
            updateAfterSlidePercents: function(percentsYear, creditSum){
              this.percentsYear = +percentsYear;
              this.recalculate(percentsYear, creditSum);
            }
          };
          Credit.prototype.defaultSettings = {
            percentsYear: 10,
            inflation: 1,
            creditSum: 100000,
            countYears: 25
          };

           $scope.item = new Credit({
              percentsYear: 22,
              inflation: 7,
              creditSum: 100000
            });
        }
  	};
  });
