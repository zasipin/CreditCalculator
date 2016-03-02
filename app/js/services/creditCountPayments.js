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
              this.paymentToCredit = 0;    
              this.paymentToPercents = 0;
              this.leftToPay = 0;    
              this.extraPayment = properties.extraPayment || 0;
              this.recalculate(this.annualPercent, this.creditAmount);
        };
        
        CreditCountPayments.prototype = Object.create(CreditCount.prototype);
        
        CreditCountPayments.prototype.recalculate = function(annualPercent, creditAmount, extraPayment){
                 var monthlyPercent = annualPercent / this.monthsInYear / 100;
                 var power = Math.pow((1 + monthlyPercent), this.months),
                    recentYear;
                 this.creditAmount = creditAmount;    
                 this.extraPayment = extraPayment || this.extraPayment;
                 if(power === 1) {
                    this.annuitetCoefficient = 0; 
                 } else {
                    this.annuitetCoefficient = monthlyPercent * power / (power - 1);    
                 }
                 
                 this.monthlyPay = creditAmount * this.annuitetCoefficient;
                 this.paymentToPercents = annualPercent * creditAmount / 100 / 12;     
                 this.paymentToCredit = this.monthlyPay - this.paymentToPercents;
                 this.leftToPay = this.creditAmount - this.paymentToCredit - this.extraPayment;
            };
        return CreditCountPayments;
    }]);