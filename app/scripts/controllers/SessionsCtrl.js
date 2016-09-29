var app = angular.module(appName);

app.controller('SessionCtrl', ['$scope','$http','SessionsData', 'properties',
    function($scope, $http, SessionsData, properties) {
        SessionsData.success(function(data){
            $scope.sessions = data;
        });
        $scope.deleteSession = function(session){
            $http.delete(properties.urlHost+'/hfadmin/session/'+session.session_php_id).success(function(data){
                console.log(data);
                if(data){
                    $scope.sessions.splice($scope.sessions.indexOf(session), 1);
                }
            });
        }
        $scope.deleteAll = function(){
            $http.delete(properties.urlHost+'/hfadmin/sessions').success(function(data){
                if(data){
                    $scope.sessions=[];
                }
                console.log(data);
            });
        }
    }]);