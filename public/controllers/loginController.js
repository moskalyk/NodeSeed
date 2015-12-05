//angular
Mean.controller('loginController', function($scope, $http, $location) {
    $scope.submit = function(accountID) {
        
        console.log("ahoy!");        
        $scope.accountID = accountID;

        $http.get("/login/" + accountID).success(function(res) {
            if (res){
                //console.log("In Login controller-> " + res.toSource());
                currentUser = res;
                $location.path("/account/"+ accountID);

            } else {

                alert('YOUUUU SHALLLLLLLL NOTT PASSSS!!!');
            }
        });
    };
});