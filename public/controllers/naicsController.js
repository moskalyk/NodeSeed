MTC.controller('naicsController', function($scope, $http, $location) {
	$scope.lookUp = function(){
		var code = $('#naics-code').val()
		$http.get('/companiesExtractAllLetter/' + code).success(function(data, status){
			$scope.persons = data
			// console.log(data)
		}).error(function(data,status){

		})

		$http.get('/NAICSCode/' + code).success(function(data, status){
			$scope.industry = data[0].Industry
			console.log(data)
		}).error(function(data,status){

		})
	}

	$scope.save = function(){
		var search = {
			name: $scope.Name,
			// company: $scope.name,
			email : $scope.email,
			title : $scope.title,
			tele : $scope.tele,
			employees : $scope.employees,
			lower : $scope.lower,
			upper : $scope.upper,
			IClink : $scope.IClink
		}
		$http.post('/saveSearch', search)
	}
	$scope.getCompany = function(link){
		console.log(link)
		var query = {
			'link': link
		}

		$http.post('/scrapeCompanyNew', query).success(function(data, status){
			console.log(data)
			$scope.name = data.Contact.Name
			$scope.companyName = data.CompanyName
			$scope.email = data.Contact.Email
			$scope.title = data.Contact.Title
			$scope.tele = data.Contact.Telephone
			$scope.employees = data.NumberOfEmployees
			$scope.lower = data.TotalSales.Lower
			$scope.upper = data.TotalSales.Upper
			$scope.IClink = link
			

		}).error(function(data,status){
			console.log(data)
		})
	}

})