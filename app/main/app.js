var myApp = angular.module("VMManager", ["firebase"]);

function VMList($scope, $firebase,$http) {
    var vmRef = new Firebase("https://crackling-fire-2444.firebaseio.com/vms");
    $scope.vms = $firebase(vmRef);
    $scope.addVM = function() {
        $http.get("api/vms").success(function(data){
            $scope.vms.$add(data);
        });
    };
}