 
 var MTC = angular.module('MTC', ['ngRoute']);

 // configure our routes
 MTC.config(function($routeProvider) {

     $routeProvider
     .when('/', {
         templateUrl: 'views/login.html',
         controller: 'loginController'
     })
    .otherwise({
        redirectTo: '/'
      });
 });
 
 MTC.controller('mainController', function($scope) {
 });