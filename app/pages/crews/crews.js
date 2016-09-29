var app = angular.module(appName);

app.controller('CrewsCtrl',

    function($scope, $http, properties) {

        $http.get(properties.urlHost+'/1/admin/crews').success(function(data){
            console.log(data);
            $scope.crews = data
        });

    });