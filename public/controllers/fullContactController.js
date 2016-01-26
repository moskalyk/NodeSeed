MTC.controller('fullContactController', function($scope, $http, $location) {
	
	var name = {
		name: $('#name').val()
	}

	$http.get('/fullcontact/name', name).success(function(data, status){
		console.log(data)
	})

})