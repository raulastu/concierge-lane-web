var app = angular.module(appName);

app.controller('PlacesCtrl',

    function($scope, $http, properties, $routeParams, PlacesData, NgMap) {
//
//        UsersData.success(function(data){
//            $scope.users = data;
//        });
////        commenting out for security issue -
        PlacesData.success(function(data){
            console.log(data);
            $scope.places = data;




        });


        $scope.fitPlacesInMap = function(){

            var bounds = new google.maps.LatLngBounds();
            var data = $scope.places;
            for (var i=0; i<data.length; i++) {
                if(!data[i].show)continue
                var lat = data[i].lat;
                var lng = data[i].lng;
                console.log(data[i].name, lat,lng)

                //var latlng = new google.maps.LatLng([-24,132]);
                var latlng = new google.maps.LatLng(data[i].lat, data[i].lng);
                console.log(latlng)
                bounds.extend(latlng);
            }

            NgMap.getMap().then(function(map) {
                map.setCenter(bounds.getCenter());
                map.fitBounds(bounds);
            });

        }
        //NgMap.getMap().then(function(map) {
        //    vm.showCustomMarker= function(evt) {
        //        map.customMarkers.foo.setVisible(true);
        //        map.customMarkers.foo.setPosition(this.getPosition());
        //    };
        //    vm.closeCustomMarker= function(evt) {
        //        this.style.display = 'none';
        //    };
        //});

        $scope.deletePlace = function(place){
            $http.delete(properties.urlHost+'/1/admin/places/'+place.place_id).success(function(data){
                console.log(data);
                $scope.places.splice($scope.places.indexOf(place), 1);


                //        $scope.installations = data.installations;
                //        //if(data){
                //        //    $scope.users.splice($scope.users.indexOf(admin), 1);
                //        //}
            });
        }


        //$scope.updateUserData = function(personId){
        //    $routeParams.userId=personId
        //    $http.get(properties.urlHost+'/1/admin/users/'+personId).success(function(data){
        //        console.log(data);
        //        $scope.installations = data.installations;
        //        //if(data){
        //        //    $scope.users.splice($scope.users.indexOf(admin), 1);
        //        //}
        //    });
        //}

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