var app = angular.module(appName);
app.factory('EmployeesData', ['$http','properties',
    function($http,properties){
        return $http.get(properties.urlHost+'/hfadmin/employees');
    }
]);