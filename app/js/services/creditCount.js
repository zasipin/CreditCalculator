'use strict';

angular.module('myApp.services')
.service('CreditCount', function(){
    var CreditCount = function CreditCount(properties){
              this.months = properties.months >=0 ? properties.months || 0 : 0;
              this.isForRecentDifference = properties.isForRecentDifference || false;   
              this.annuitetCoefficient = 0;     
              this.monthlyPay = 0;
              this.totalPay = 0;
              this.overpay = 0;
              this.overpayPercentage = 0;
              this.recentYearDifference = 0;
              this.creditAmount = properties.creditAmount || 0;    
              this.annualPercent = properties.annualPercent || 0;
              this.recalculate(this.annualPercent, this.creditAmount);
          };
    CreditCount.prototype.monthsInYear = 12;
    CreditCount.prototype.recalculate = function(annualPercent, creditAmount){
                 var monthlyPercent = annualPercent / this.monthsInYear / 100;
                 var power = Math.pow((1 + monthlyPercent), this.months),
                    recentYear;
                 this.updateCoefficients(monthlyPercent, creditAmount);
        
                 if(power === 1) {
                    this.annuitetCoefficient = 0; 
                 } else {
                    this.annuitetCoefficient = monthlyPercent * power / (power - 1);    
                 }                 
                 this.monthlyPay = creditAmount * this.annuitetCoefficient;
                 this.totalPay = this.monthlyPay * this.months;
                 this.overpay = this.totalPay - creditAmount;
                 if(creditAmount === 0) {
                        this.overpayPercentage = 0;
                 } else {
                        this.overpayPercentage = (this.overpay / creditAmount) * 100;                 
                 }
                if(!this.isForRecentDifference)
                {
                    recentYear = new CreditCount({ months: this.months - this.monthsInYear, 
                                                annualPercent: this.annualPercent,
                                                creditAmount: this.creditAmount,
                                                isForRecentDifference: true                            
                                              });
                    this.recentYearDifference = recentYear.totalPay === 0 ? 0 :
                                                (this.overpayPercentage - recentYear.overpayPercentage);
                }                    
            }; 
    
    CreditCount.prototype.updateCoefficients = function(annualPercent, creditAmount){
            this.creditAmount = creditAmount || 0;    
            this.annualPercent = annualPercent || 0;
        };
    
    return CreditCount;
});
