var app = angular.module(appName);

app.controller('UserCrl',

    function($scope, $http, properties, $routeParams) {
//
//        UsersData.success(function(data){
//            $scope.users = data;
//        });
////        commenting out for security issue -
        var personId = $routeParams.userId
        if(personId){
            $http.get(properties.urlHost+'/1/admin/users/'+personId).success(function(data){
                console.log(data);
                $scope.installations = data.installations;
                //if(data){
                //    $scope.users.splice($scope.users.indexOf(admin), 1);
                //}
            });
        }


        $scope.updateUserData = function(personId){
            $routeParams.userId=personId
            $http.get(properties.urlHost+'/1/admin/users/'+personId).success(function(data){
                console.log(data);
                $scope.installations = data.installations;
                //if(data){
                //    $scope.users.splice($scope.users.indexOf(admin), 1);
                //}
            });
        }

//        $scope.deleteUser = function(admin){
//            $http.delete(properties.urlHost+'/hfadmin/user/'+admin.admin_id).success(function(data){
//                console.log(data);
//                if(data){
//                    $scope.users.splice($scope.users.indexOf(admin), 1);
//                }
//            });
//        }
//
//        $scope.sendActivationEmail = function(admin){
//            $http.post(properties.urlHost+'/hfadmin/admin/activate/mail/'+admin.email).success(function(data){
//                console.log(data);
//            });
//        }
//
//        $scope.activate = function(admin){
//            $http.post(properties.urlHost+'/hfadmin/admin/activate/'+admin.email).success(function(data){
//                console.log(data);
//                admin.status=2;
////                if(data){
////                    $scope.users.splice($scope.users.indexOf(admin), 1);
////                }
//            });
//        }
    });