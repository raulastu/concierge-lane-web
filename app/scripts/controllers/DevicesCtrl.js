var app = angular.module(appName);

app.controller('DevicesCtrl', ['$scope','$http','DevicesData', 'properties',
    function($scope, $http, DevicesData, properties) {
        DevicesData.success(function(data){
            $scope.devices = data;
        });
        $scope.pushGCM = function(regId){
            $scope.result="";
            var payload = $scope.payload;
//            JSON.parse(payload);
//            payload
            $http({
                method:'post',
                url: properties.urlHost+'/hfadmin/push/arbitrary?reg_id='+regId,
                data:payload
            }).success(function(data){
                console.log(data);
                $scope.result=JSON.stringify(data);
            });
        }
        $scope.deleteAll = function(){
            $http.delete(properties.urlHost+'/hfadmin/devices').success(function(data){
                console.log(data);
            });
        }
    }]);