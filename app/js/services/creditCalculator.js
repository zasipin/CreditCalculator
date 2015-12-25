'use strict';

angular.module('myApp.services')
.service('creditCalculator', [function(){
    var CreditCalculator = function(){
        this.credits = [];
    };
    
    CreditCalculator.prototype = {
        addCredit: function(creditItem){
            this.credits.push(creditItem);
        },
        removeCredit: function(){
            this.credits.pop();
        },
        recalculate: function(percentsPerMonth, creditSum){
            var i = 0;
            for(; i < this.credits.length; i++)
            {
                this.credits[i].recalculate(percentsPerMonth, creditSum);
            }
        },
        getCredits: function(){
            return this.credits;
        }
    };
    
    return new CreditCalculator();
}]);