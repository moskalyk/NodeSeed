MTC.controller('headerController', function($scope, $http, $location) {
	// $('#hamburger').trigger('click')
	// $('#hamburger').trigger('click')
	// location.reload()

	
	var partial = window.location.href.split('/#/')
	partial = partial[1]
	$scope.poop ='Navigation'

	if(partial=="data-dot-com"){
		$("#data-dot-com-tab").addClass('active')
		$("#full-contact-tab").removeClass('active')
		$("#rapportive-tab").removeClass('active')
		$("#industry-search-tab").removeClass('active')
		$("#naics-lookup-tab").removeClass('active')
		$("#industry-main-tab").removeClass('open')
		$("#search-tab").removeClass('active')

	} else if(partial==="full-contact"){
		$("#data-dot-com-tab").removeClass('active')
		$("#full-contact-tab").addClass('active')
		$("#rapportive-tab").removeClass('active')
		$("#industry-search-tab").removeClass('active')
		$("#naics-lookup-tab").removeClass('active')
		$("#industry-main-tab").removeClass('open')
		$("#search-tab").removeClass('active')

	} else if(partial==="rapportive"){
		$("#data-dot-com-tab").removeClass('active')
		$("#full-contact-tab").removeClass('active')
		$("#rapportive-tab").addClass('active')
		$("#industry-search-tab").removeClass('active')
		$("#naics-lookup-tab").removeClass('active')
		$("#industry-main-tab").removeClass('open')
		$("#search-tab").removeClass('active')

	}else if(partial==="industry-canada/browse"){
		$("#data-dot-com-tab").removeClass('active')
		$("#full-contact-tab").removeClass('active')
		$("#rapportive-tab").removeClass('active')
		$("#industry-search-tab").addClass('active')
		$("#naics-lookup-tab").removeClass('active')
		$("#industry-main-tab").addClass('open')
		$("#search-tab").removeClass('active')

	}else if(partial==="industry-canada/naics-look-up"){
		$("#data-dot-com-tab").removeClass('active')
		$("#full-contact-tab").removeClass('active')
		$("#rapportive-tab").removeClass('active')
		$("#industry-search-tab").removeClass('active')
		$("#naics-lookup-tab").addClass('active')
		$("#industry-main-tab").addClass('open')
		$("#search-tab").removeClass('active')

	}else if(partial==="searches"){
		$("#data-dot-com-tab").removeClass('active')
		$("#full-contact-tab").removeClass('active')
		$("#rapportive-tab").removeClass('active')
		$("#industry-search-tab").removeClass('active')
		$("#naics-lookup-tab").removeClass('active')
		$("#industry-main-tab").removeClass('open')
		$("#search-tab").addClass('active')
	}

	//URL Navigation
	$scope.dataDotCom = function(){
		$location.path('/data-dot-com')
	}
	$scope.fullContact = function(){
		$location.path('/full-contact')
	}
	$scope.rapportive = function(){
		$location.path('/rapportive')
	}
	$scope.industryCanada = function(){
		$location.path('/industry-canada/browse')
	}
	$scope.naicsLookUp = function(){
		$location.path('/industry-canada/naics-look-up')
	}
	$scope.search = function(){
		$location.path('/searches')
	}
	$scope.logout = function(){
		//Need to send request to logout
		$location.path('/')
	}
})