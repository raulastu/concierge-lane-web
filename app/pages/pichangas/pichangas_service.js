var app = angular.module(appName);

//app.factory('PichangasData', ['$http','properties',
//    function($http,properties){
//        return $http.get(properties.urlHost+'/1/admin/pichangas');
//    }
//]);

app.factory('PichangasData', ['$http','properties',
    function($http,properties){
        return {
            getByPlace:function(placeId){
                return $http.get(properties.urlHost+'/1/admin/pichangas?place_id='+placeId)
            },
            getAll: function () {
                return $http.get(properties.urlHost+'/1/admin/pichangas')
            }
        };
    }
]);

app.factory('PichangaInfo', ['$http','properties',
    function($http,properties){

        var a = {
            getById : function(pichangaId){
                return $http.get(properties.urlHost+'/1/admin/pichangas/'+pichangaId);
            }
        }
        return a;
    }
]);