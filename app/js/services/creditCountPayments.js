'use strict';

angular.module('myApp.services')
    .service('CreditCountPayments', ['CreditCount', function(CreditCount){
        var CreditCountPayments = function(properties){
              this.months = properties.months >=0 ? properties.months || 0 : 0;
              this.annuitetCoefficient = 0;     
              this.monthlyPay = 0;
              this.totalPay = 0;
              this.creditAmount = properties.creditAmount || 0;    
              this.annualPercent = properties.annualPercent || 0;
              this.recalculate(this.annualPercent, this.creditAmount);
            
            this.extraPayment = properties.extraPayment || 0;
            this.recalculate(this.annualPercent, this.creditAmount);
        };
        CreditCountPayments.prototype = Object.create(CreditCount.prototype);
        CreditCountPayments.prototype.recalculate = function(annualPercent, creditAmount){
                 var monthlyPercent = annualPercent / this.monthsInYear / 100;
                 var power = Math.pow((1 + monthlyPercent), this.months),
                    recentYear;
        
                 if(power === 1) {
                    this.annuitetCoefficient = 0; 
                 } else {
                    this.annuitetCoefficient = monthlyPercent * power / (power - 1);    
                 }
                 
                 this.monthlyPay = creditAmount * this.annuitetCoefficient;
            };
        return CreditCountPayments;
    }]);