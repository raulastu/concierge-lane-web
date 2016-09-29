var app = angular.module(appName);

app.controller('ActivityCtrl',
    function($scope, $http, DevicesData, properties, $routeParams) {
        if($routeParams.branch_id){
            $scope.branchName = $routeParams.branch_id
            $http.get(properties.urlHost+'/hfconsole/branches/'+$routeParams.branch_id+'/activity').success(function(data){
                $scope.branch = data;
                $scope.branchName  = data.branch_name;
                $scope.orders = data.orders;
            });
        }else{
            $http.get(properties.urlHost+'/hfconsole/branches').success(function(data){
                $scope.branches = data;
            });
        }
    });