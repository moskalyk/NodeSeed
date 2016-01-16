 
 var MTC = angular.module('MTC', ['ngRoute']);

 // configure our routes
 MTC.config(function($routeProvider) {

     $routeProvider
     .when('/', {
         templateUrl: 'views/login.html',
         controller: 'loginController'
     })
     .when('/data-dot-com', {
         templateUrl: 'views/data.html',
         controller: 'dataController'
     })
     .when('/full-contact', {
         templateUrl: 'views/fullContact.html',
         controller: 'fullContactController'
     })
     .when('/rapportive', {
         templateUrl: 'views/rapportive.html',
         controller: 'rapportiveController'
     })
    .otherwise({
        redirectTo: '/'
      });
 });
 
 MTC.controller('mainController', function($scope) {
 });