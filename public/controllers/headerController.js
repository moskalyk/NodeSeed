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
	} else if(partial==="full-contact"){
		$("#data-dot-com-tab").removeClass('active')
		$("#full-contact-tab").addClass('active')
		$("#rapportive-tab").removeClass('active')
	} else if(partial==="rapportive"){
		$("#data-dot-com-tab").removeClass('active')
		$("#full-contact-tab").removeClass('active')
		$("#rapportive-tab").addClass('active')
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
	$scope.logout = function(){
		//Need to send request to logout
		$location.path('/')
	}
})