var app = angular.module(appName);

app.controller('CrewCtrl',

    function($scope, $http, properties, $routeParams) {

        var crewId = $routeParams.crewId
        $http.get(properties.urlHost+'/1/admin/crews/'+crewId).success(function(data){
            console.log(data);
            $scope.crew = data
        });
    });