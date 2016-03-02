'use strict';

angular.module('myApp.services')
.service('creditData', function(){
    this.creditSum = this.creditSum || 0;
    this.creditPeriod = this.creditPeriod || 0;
    this.percents = this.percents || 0;
    this.update = function(percents, creditSum, creditPeriod){
        this.percents = percents;
        this.creditSum = creditSum;
        this.creditPeriod = creditPeriod;
    };
});