var app = angular.module(appName);

app.factory('UsersData', ['$http','properties',
    function($http,properties){
        return $http.get(properties.urlHost+'/1/admin/users');
    }
]);