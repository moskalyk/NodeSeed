//angular
MTC.controller('loginController', function($scope, $http, $location) {
    $scope.submit = function(accountID) {
        var firstName = $('#first-name').val()
        var lastName = $('#last-name').val()
        var domain = $('#domain').val()
        var emails = []

        //Simple
        emails.push(firstName + '@'+domain)
        emails.push(lastName + '@'+domain)

        //Basics
        emails.push(firstName + lastName + '@'+domain)
        emails.push(firstName + '.' +lastName + '@'+domain)
        emails.push(firstName.substring(0,1) + lastName + '@'+domain)
        emails.push(firstName.substring(0,1) + '.' + lastName + '@'+domain)
        emails.push(firstName + lastName.substring(0,1) + '@'+domain)
        emails.push(firstName + '.' +lastName.substring(0,1) + '@'+domain)
        emails.push(firstName.substring(0,1) + lastName.substring(0,1) + '@'+domain)
        emails.push(firstName.substring(0,1) + '.' + lastName.substring(0,1) + '@'+domain)

        //Backwards

        var masterEmailList = ''

        for (var i = 0; i < emails.length-1; i++)
            masterEmailList += emails[i] +', '
        
        masterEmailList += emails[emails.length-1]

        $("body").append("<input type='text' id='temp' style='position:absolute;opacity:0;'>");
        $("#temp").val(masterEmailList).select();
        document.execCommand("copy");
        $("#temp").remove();

        console.log(masterEmailList)
        alert('Your emails have been generated!')
        
    };
});