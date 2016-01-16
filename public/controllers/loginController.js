
MTC.controller('loginController', function($scope, $http, $location) {
    deleteAllNotifications = function(){
        if($("#alert-warning-fields").length > 0)
            $("#alert-warning-fields").remove()
        if($("#alert-warning-passwords").length > 0)
            $("#alert-warning-passwords").remove()
        if($("#alert-warning-email-exists").length > 0)
            $("#alert-warning-email-exists").remove()
    }

    $scope.signIn = function(){
        console.log('Attempting to sign in.')
        deleteAllNotifications();
        if($("#inputEmail").val().length ==0 || $("#inputPassword").val().length ==0 ){
            var notification = "<div id='alert-warning-fields' class=\"alert alert-danger alert-sm\">"
                + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>"
                + "<span class=\"fw-semi-bold\">Please fill out all fields.</span>"
                + "</div>"
            $('#message-notifier').append(notification)
        }else{
            console.log('looking up')
            var user = {
                Email: $("input[name=email]").val(),
                Password: $("input[name=password]").val()
            }

            $http.post('/login', user).
                success(function(data, status){
                console.log(data)
                console.log(status)

                if($("#alert-warning-email-exists").length > 0)
                  $("#alert-warning-email-exists").remove()

                  var notification = "<div id='alert-success' class=\"alert alert-info alert-sm\">"
                    + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>"
                    + "<span class=\"fw-semi-bold\">SUCCESS! You are now being redirected!</span>"
                    + "</div>"

                  $('#message-notifier').append(notification)
                  $('.alert-info').css('color','#31708f')
                   
                  setTimeout(function(){}, 10)
                  console.log('searcg')
                  $location.path('/search')
                  
                }).
                error(function(data, status){
                console.log('User Exists with that Email!')
                console.log(data)
                console.log(status)

                if($("#alert-warning-email-exists").length < 1){

                  var notification = "<div id='alert-warning-email-exists' class=\"alert alert-danger alert-sm\">"
                    + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>"
                    + "<span class=\"fw-semi-bold\">Sorry, that email and password is not valid.</span>"
                    + "</div>"

                  $('#message-notifier').append(notification)
                    $(".alert").fadeOut(4000, function() { 
                        $(this).remove()
                    })
                }
                })
            $location.path('/rapportive')

        }
        $(".alert").fadeOut(4000, function() { 
            $(this).remove()
        })

    }


    
});