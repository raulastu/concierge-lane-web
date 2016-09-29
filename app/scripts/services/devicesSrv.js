var app = angular.module(appName);
app.factory('DevicesData', ['$http','properties', 
    function($http,properties){
        return $http.get(properties.urlHost+'/hfadmin/devices');
    }
    ]);