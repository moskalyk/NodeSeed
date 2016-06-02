 
 var MEAN = angular.module('MEAN', ['ngRoute']);

 MEAN.config(function($routeProvider) {

     $routeProvider
     .when('/', {
         templateUrl: 'views/home.html',
         controller: 'homeController'
     })
    .otherwise({
        redirectTo: '/'
      });
 });
 
 MEAN.controller('mainController', function($scope) {
    
 });