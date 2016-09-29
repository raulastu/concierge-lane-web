var app = angular.module(appName);

app.controller('EmployeesCtrl', ['$scope','$http','EmployeesData', 'properties',
    function($scope, $http, EmployeesData, properties) {
        console.log('EmployeesCtrl');

        EmployeesData.success(function(data){
            $scope.employees = data;
        });

//        commenting out for security issue -
        $scope.deleteUser = function(admin){
            $http.delete(properties.urlHost+'/hfadmin/user/'+admin.admin_id).success(function(data){
                console.log(data);
                if(data){
                    $scope.users.splice($scope.users.indexOf(admin), 1);
                }
            });
        }

        $scope.sendActivationEmail = function(admin){
            $http.post(properties.urlHost+'/hfadmin/admin/activate/mail/'+admin.email).success(function(data){
                console.log(data);
            });
        }

        $scope.activate = function(admin){
            $http.post(properties.urlHost+'/hfadmin/admin/activate/'+admin.email).success(function(data){
                console.log(data);
                admin.status=2;
//                if(data){
//                    $scope.users.splice($scope.users.indexOf(admin), 1);
//                }
            });
        }
    }])
;