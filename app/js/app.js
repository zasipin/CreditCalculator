'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'LocalStorageModule'
]).
config(['localStorageServiceProvider', function(localStorageServiceProvider){
	localStorageServiceProvider.prefix ='cr';
}]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'mainCtrl'});
  $routeProvider.otherwise({redirectTo: '/main'});
}]).
constant("appConfig", {
        "emailToAdress": "creditcalculator.developer@gmail.com",
        "emailToText": "Написать разработчику",
    });
