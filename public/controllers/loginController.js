//angular
MTC.controller('loginController', function($scope, $http, $location) {
    $scope.submit = function(accountID) {
        var firstName = $('#first-name').val()
        var lastName = $('#last-name').val()
        var middleName = $('#middle-name').val()
        var domain = $('#domain').val()
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
        
        // emails.push(lastName + '-' + middleName.substring(0,1) + '-' + firstName + '@'+ domain)
        // emails.push(lastName.substring(0,1) + '-' + middleName + '-' + firstName.substring(0,1) + '@'+ domain)
        // emails.push(lastName+ '-' + middleName + '-' + firstName + '@'+ domain)
       
        //Underscores
        emails.push(firstName + '_' +lastName + '@'+ domain)
        emails.push(firstName.substring(0,1) + '_' +lastName + '@'+ domain)
        emails.push(firstName + '_' +lastName.substring(0,1) + '@'+ domain)
        emails.push(firstName.substring(0,1) + '_' + lastName.substring(0,1) + '@'+ domain)

        emails.push(lastName + '_' + firstName.substring(0,1) + '@'+ domain)
        emails.push(lastName.substring(0,1) + '_' + firstName + '@'+ domain)
        emails.push(lastName.substring(0,1) + '_' + firstName.substring(0,1) + '@'+ domain)
        
        // emails.push(lastName + '_' + middleName.substring(0,1) + '_' + firstName + '@'+ domain)
        // emails.push(lastName.substring(0,1) + '_' + middleName + '_' + firstName.substring(0,1) + '@'+ domain)
        // emails.push(lastName+ '_' + middleName + '_' + firstName + '@'+ domain)


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