
MTC.controller('rapportiveController', function($scope, $http, $location) {
	

    $scope.$on('$viewContentLoaded', function(){
	 // Run after view loaded.
	 $.getScript('../js/sections/menu.js')
    $.getScript('../js/sections/menubar.js')
    $.getScript('../js/sections/sidebar.js')
    $.getScript('../examples/js/advanced/scrollable.js')
	 console.log('loaded')
	});

	function validateEmail(email) {
	    var re = /((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}

	$scope.submit = function(accountID) {
		var firstName = $('#first-name').val()
        var lastName = $('#last-name').val()
        var middleName = $('#middle-name').val()
        var domain = $('#domain').val()

		if(!validateEmail(domain)) {

			if($("#alert-warning-email-exists").length > 0)
	        	$("#alert-warning-email-exists").remove()

	        var notification = "<div id='alert-warning-email-exists' class=\"alert alert-danger alert-sm\">"
                    + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>"
                    + "<span class=\"fw-semi-bold\">Sorry, that is not a proper email.</span>"
                    + "</div>"

          $('#message-notifier').append(notification)
            $(".alert").fadeOut(4000, function() { 
                $(this).remove()
            })

		}else if(!(firstName.length > 0 || lastName.length > 0 || firstName.length > 0)) {
			if($("#alert-warning-email-exists").length > 0)
	        	$("#alert-warning-email-exists").remove()

	        var notification = "<div id='alert-warning-email-exists' class=\"alert alert-danger alert-sm\">"
                    + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>"
                    + "<span class=\"fw-semi-bold\">Sorry, you need at least one name.</span>"
                    + "</div>"

          $('#message-notifier').append(notification)
            $(".alert").fadeOut(4000, function() { 
                $(this).remove()
            })
		}else{
	        var emails = []

	        //Simple
	        emails.push(firstName + '@' + domain)
	        emails.push(lastName + '@' + domain)

	        //Basics
	        emails.push(firstName + lastName + '@'+ domain)
	        emails.push(firstName + '.' + lastName + '@' + domain)
	        emails.push(firstName.substring(0,1) + lastName + '@' + domain)
	        emails.push(firstName.substring(0,1) + '.' + lastName + '@' + domain)
	        emails.push(firstName + lastName.substring(0,1) + '@' + domain)
	        emails.push(firstName + '.' +lastName.substring(0,1) + '@' + domain)
	        emails.push(firstName.substring(0,1) + lastName.substring(0,1) + '@' + domain)
	        emails.push(firstName.substring(0,1) + '.' + lastName.substring(0,1) + '@' + domain)
	        
	        var temp = firstName
	        firstName = lastName
	        firstName = temp

	        //Backwards
	        emails.push(firstName + lastName + '@'+ domain)
	        emails.push(firstName + '.' + lastName + '@' + domain)
	        emails.push(firstName.substring(0,1) + lastName + '@' + domain)
	        emails.push(firstName.substring(0,1) + '.' + lastName + '@' + domain)
	        emails.push(firstName + lastName.substring(0,1) + '@' + domain)
	        emails.push(firstName + '.' +lastName.substring(0,1) + '@' + domain)
	        emails.push(firstName.substring(0,1) + lastName.substring(0,1) + '@' + domain)
	        emails.push(firstName.substring(0,1) + '.' + lastName.substring(0,1) + '@' + domain)
	        
	        var temp = firstName
	        firstName = lastName
	        firstName = temp

	        //Middle Names
	        emails.push(firstName.substring(0,1) + middleName.substring(0,1) + lastName + '@'+ domain)
	        emails.push(firstName + middleName.substring(0,1) + lastName + '@'+ domain)
	        emails.push(firstName + middleName.substring(0,1) + '.' + lastName + '@'+ domain)
	        emails.push(firstName + '.' + middleName.substring(0,1) + '.' + lastName + '@'+ domain)
	        emails.push(firstName + middleName + lastName + '@'+ domain)
	        emails.push(firstName + '.' + middleName + '.' +lastName + '@'+ domain)
	        
	        //Dashes
	        emails.push(firstName + '-' +lastName + '@'+ domain)
	        emails.push(firstName.substring(0,1) + '-' +lastName + '@'+ domain)
	        emails.push(firstName + '-' +lastName.substring(0,1) + '@'+ domain)
	        emails.push(firstName.substring(0,1) + '-' + lastName.substring(0,1) + '@'+ domain)
	        emails.push(lastName + '-' + firstName.substring(0,1) + '@'+ domain)
	        emails.push(lastName.substring(0,1) + '-' + firstName + '@'+ domain)
	        emails.push(lastName.substring(0,1) + '-' + firstName.substring(0,1) + '@'+ domain)
	        emails.push(lastName + '-' + middleName.substring(0,1) + '-' + firstName + '@'+ domain)
	        emails.push(lastName.substring(0,1) + '-' + middleName + '-' + firstName.substring(0,1) + '@'+ domain)
	        emails.push(lastName+ '-' + middleName + '-' + firstName + '@'+ domain)
	       
	        //Underscores
	        emails.push(firstName + '_' +lastName + '@'+ domain)
	        emails.push(firstName.substring(0,1) + '_' +lastName + '@'+ domain)
	        emails.push(firstName + '_' +lastName.substring(0,1) + '@'+ domain)
	        emails.push(firstName.substring(0,1) + '_' + lastName.substring(0,1) + '@'+ domain)
	        emails.push(lastName + '_' + firstName.substring(0,1) + '@'+ domain)
	        emails.push(lastName.substring(0,1) + '_' + firstName + '@'+ domain)
	        emails.push(lastName.substring(0,1) + '_' + firstName.substring(0,1) + '@'+ domain)
	        emails.push(lastName + '_' + middleName.substring(0,1) + '_' + firstName + '@'+ domain)
	        emails.push(lastName.substring(0,1) + '_' + middleName + '_' + firstName.substring(0,1) + '@'+ domain)
	        emails.push(lastName+ '_' + middleName + '_' + firstName + '@'+ domain)


	        var masterEmailList = ''

	        for (var i = 0; i < emails.length-1; i++)
	            masterEmailList += emails[i] +', '
	        
	        masterEmailList += emails[emails.length-1]

	        $("body").append("<input type='text' id='temp' style='position:absolute;opacity:0;'>");
	        $("#temp").val(masterEmailList).select();
	        document.execCommand("copy");
	        $("#temp").remove();

	        console.log(masterEmailList)
	        // alert('Your emails have been generated!')
	        if($("#alert-warning-email-exists").length > 0)
	        	$("#alert-warning-email-exists").remove()

	        if($("#alert-success").length > 0)
	        	$("#alert-success").remove()

	        var notification = "<div id='alert-success' class=\"alert alert-info alert-sm\">"
            + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>"
            + "<span class=\"fw-semi-bold\">A list of emails have been copied to your clipboard!</span>"
            + "</div>"

          	$('#message-notifier').append(notification)
          	$('.alert-info').css('color','#31708f')

	        $(".alert").fadeOut(4000, function() { 
	            $(this).remove()
	        })

	    }
        
    };
});