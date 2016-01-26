MTC.controller('industryCanadaController', function($scope, $http, $location) {

	$scope.getCompanies = function(NAICS){
		$location.path('/naics/' + NAICS)
	}
	
	$scope.lookUp = function(letter){
		if(letter == 'All'){
			$http.get('/NAICS').success(function(data, status){
				$scope.persons = data
			}).error(function(data,status){

			})
		}else{
			$http.get('/NAICSLetter/'+ letter ).success(function(data, status){
				$scope.persons = data
			}).error(function(data,status){

			})
		}
		
	}
	// $http.get('/NAICSLetter/A').success(function(data, status){
	// 	var vm.persons = data
	// 	// $('#industry-list').append(data)
	// }).error(function(data,status){

	// })

	// var vm = [{
	// 		    "id": 860,
	// 		    "firstName": "Superman",
	// 		    "lastName": "Yoda"
	// 		}, {
	// 		    "id": 870,
	// 		    "firstName": "Foo",
	// 		    "lastName": "Whateveryournameis"
	// 		}, {
	// 		    "id": 590,
	// 		    "firstName": "Toto",
	// 		    "lastName": "Titi"
	// 		}, {
	// 		    "id": 803,
	// 		    "firstName": "Luke",
	// 		    "lastName": "Kyle"
	// 		}]

})

// MTC.controller('AngularWayCtrl', function($resource) {
//     var vm = [{
// 			    "id": 860,
// 			    "firstName": "Superman",
// 			    "lastName": "Yoda"
// 			}, {
// 			    "id": 870,
// 			    "firstName": "Foo",
// 			    "lastName": "Whateveryournameis"
// 			}, {
// 			    "id": 590,
// 			    "firstName": "Toto",
// 			    "lastName": "Titi"
// 			}, {
// 			    "id": 803,
// 			    "firstName": "Luke",
// 			    "lastName": "Kyle"
// 			}]

//     $resource('data.json').query().$promise.then(function(persons) {
//         vm.persons = persons;
//     });
// })