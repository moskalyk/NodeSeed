 
 var MTC = angular.module('MTC', ['ngRoute','datatables']);

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
     .when('/industry-canada/browse', {
         templateUrl: 'views/industryCanada.html',
         controller: 'industryCanadaController'
     })
     .when('/naics/:code', {
         templateUrl: 'views/naicsCode.html',
         controller: 'naicsCodeController'
     })
     .when('/industry-canada/naics-look-up', {
         templateUrl: 'views/naics.html',
         controller: 'naicsController'
     })
     .when('/searches', {
         templateUrl: 'views/searches.html',
         controller: 'searchController'
     })
    .otherwise({
        redirectTo: '/'
      });
 });
 
 MTC.controller('mainController', function($scope) {
    
 });