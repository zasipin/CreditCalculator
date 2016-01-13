'use strict';

/* jasmine specs for services go here */

describe('service', function() {
/*
  beforeEach(function(){
    module('myApp.services');
    inject(function($injector) {
    credit = $injector.get('credit');
      });

   });
*/
    
  beforeEach(function(){
    module('myApp.services');
    module('LocalStorageModule')
   });
    
//  beforeEach(module('myApp.services'));
//  beforeEach(module('LocalStorageModule'));

  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('1.0.0');
    }));
  });

describe('CreditBoard', function(){
  it('check the existence of CreditBoard', inject(function(CreditBoard) {
      expect(CreditBoard).toBeDefined();
    }));  
});
   
describe('CreditCount', function(){
  it('check the existence of CreditCount', inject(function(CreditCount) {
      expect(CreditCount).toBeDefined();
    }));  
});

describe('CreditCount', function(){
  it('check calculation of CreditCount', inject(function(CreditCount) {
      var credit = new CreditCount({ 
        months: 60, 
        creditAmount: 150000,
        annualPercent: 22
      });
      expect(Math.round(credit.monthlyPay)).toEqual(4143);
      expect(credit.recentYearDifference).toBeDefined();
      expect(credit.recentYearDifference.toFixed(2)).toEqual('14.48');
    }));  
});

describe('CreditCount', function(){
  it('check re-calculation of CreditCount', inject(function(CreditCount) {
      var credit = new CreditCount({ 
        months: 60, 
        creditAmount: 150000,
        annualPercent: 22
      });
      credit.recalculate(11, 150000);
      expect(Math.round(credit.monthlyPay)).toEqual(3261);
      expect(credit.recentYearDifference).toBeDefined();
      expect(credit.recentYearDifference.toFixed(2)).toEqual('6.40');
    }));  
});
    

describe('creditCalculator', function(){
  it('check the existence of creditCalculator', inject(function(creditCalculator) {
      expect(creditCalculator).toBeDefined();
    }));  
});

describe('creditCalculator', function(){
  it('should return length of creditCalculator', inject(function(creditCalculator) {
      expect(creditCalculator.getCredits().length).toEqual(0);
    }));  
});

describe('creditCalculator', function(){
  it('add one Credit should return length of creditCalculator', inject(function(creditCalculator) {
      creditCalculator.addCredit({});
      expect(creditCalculator.getCredits().length).toEqual(1);
      creditCalculator.removeCredit();
      expect(creditCalculator.getCredits().length).toEqual(0);
    }));  
});

 /*   it('check the existence of credit factory', inject(function(credit) {
      expect(credit).toBeDefined();
    }));
*/
/*
 describe('credits', function() {
    it('should return length of creditCount', inject(function(credit) {
      expect(credit.creditCounts.length).toEqual(25);
    }));
  });
*/

});
