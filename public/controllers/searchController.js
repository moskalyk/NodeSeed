MTC.controller('searchController', function($scope, $http, $location) {
	$http.get('/searches').success(function(data, status){
		$scope.persons = data
		console.log(data)
	}).error(function(data,status){

	})
})