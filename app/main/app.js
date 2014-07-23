var user_date=new Date();
var user_email="fake_"+( user_date.getMinutes() % 10 )+"@example.com";

mixpanel.identify(user_email);
mixpanel.people.set({
    "$email": user_email,    // only special properties need the $
    "$created": "2014-07-23 16:53:54",
    "$last_login": new Date(),         // properties can be dates...
    "credits": 150,                    // ...or numbers
    "gender": "Male"                    // feel free to define your own properties
});

mixpanel.track("Page View");

var myApp = angular.module("VMManager", ["firebase"]);
function UserInfo($scope){
    $scope.email=user_email;
}

function VMList($scope, $firebase,$http) {
    var vmRef = new Firebase("https://crackling-fire-2444.firebaseio.com/vms");
    $scope.vms = $firebase(vmRef);
    $scope.addVM = function() {
        mixpanel.track("Click Add");
        $http.post("api/vms",$scope.vm).success(function(data){
            $scope.vms.$add(data);
            mixpanel.track("New Instance");
        });
    };
}