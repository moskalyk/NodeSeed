 
 var Mean = angular.module('Mean', ['ngRoute']);
 
 url = "http://localhost:1330"

 // configure our routes
 Mean.config(function($routeProvider) {

     $routeProvider
     .when('/', {
         templateUrl: 'views/login.html',
         controller: 'loginController'
     })
    .otherwise({
        redirectTo: '/'
      });
 });
 
 Mean.controller('mainController', function($scope) {
 });