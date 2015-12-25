'use strict';

angular.module('myApp.services')
.service('CreditBoard', ['localStorageService', 'CreditCount', 'creditCalculator', function(localStorageService, CreditCount, creditCalculator){
    var CreditBoard = function(settings){
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
            
            this.creditCountsInit();
            this.creditCounts = creditCalculator.getCredits();
          };
    
          CreditBoard.prototype = {
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
                
                for(; i <= maxMonths; i += monthsIterate)
                {
                    creditCalculator.addCredit(
                        new CreditCount({months: i, annualPercent: this.percentsYear, creditAmount: this.creditSum})
                    );
                }
            },
            
            updatePercentsMonth: function(yearPercents){
              this.percentsPerMonth = yearPercents / this.monthsInYear / 100;
            },
              
            recalculate: function(percentsYear, creditSum){

              this.updatePercentsMonth(percentsYear);
              creditCalculator.recalculate(this.percentsPerMonth, creditSum);

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
    
          CreditBoard.prototype.defaultSettings = {
            percentsYear: 10,
            inflation: 1,
            creditSum: 100000,
            countYears: 25
          };     

         return CreditBoard;
}]);

