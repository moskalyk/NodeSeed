MEAN.controller('homeController', function($scope, $http, $location) {
	$scope.submit = function(username){
		$http.get('/login/' + username)
		.success(function(data,status){
			console.log(data);
			console.log(status);
		});
		alert('Open the console');
	}
});