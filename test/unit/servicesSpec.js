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
  beforeEach(module('myApp.services'));

  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });

    it('check the existence of credit factory', inject(function(credit) {
      expect(credit).toBeDefined();
    }));


 describe('credits', function() {
    it('should return length of creditCount', inject(function(credit) {
      expect(credit.creditCounts.length).toEqual(25);
    }));
  });


});
