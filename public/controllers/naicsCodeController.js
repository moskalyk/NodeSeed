MTC.controller('naicsCodeController', function($scope, $http, $location) {
	var partial = window.location.href.split('/#/naics/')
	partial = partial[1]
	console.log(partial)
	$http.get('/NAICSCode/'+ partial).success(function(data){
		$scope.code = '/ ' + data[0].Industry
	})

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
	$scope.lookUp = function(letter){
		console.log(letter)
		if(letter == 'All'){
			$http.get('/companiesExtractAllLetter/' + partial).success(function(data, status){
				$scope.persons = data
			}).error(function(data,status){

			})
		}else{
			$http.get('/companiesExtractAll/'+ letter +'/'+ partial ).success(function(data, status){
				$scope.persons = data
			}).error(function(data,status){

			})
		}
	}

})