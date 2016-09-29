var app = angular.module(appName);
app.factory('SessionsData', ['$http','properties', 
    function($http,properties){
        console.log(properties);
        return $http.get(properties.urlHost+'/hfadmin/sessions');
    }
    ]);