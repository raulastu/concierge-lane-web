appName = 'PMConsoleApp';
var app = angular.module(appName, ['ngRoute', 'ngResource', 'webStorageModule','app.properties', 'jsonFormatter' , 'angularMoment','ngMap', "firebase"])

app.config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $routeProvider
        .when('/users', {
            templateUrl : 'pages/users/users.html',
            controller  : 'UsersCtrl'
        })
        .when('/user_explorer/:userId', {
            templateUrl : '/pages/user_explorer/user.html',
            controller  : 'UserCrl'
        })
        .when('/user_explorer', {
            templateUrl : 'pages/user_explorer/user.html',
            controller  : 'UserCrl'
        })
        .when('/pichangas', {
            templateUrl : 'pages/pichangas/pichangas.html',
            controller  : 'PichangasCtrl'
        })
        .when('/pichangas/:pichangaId', {
            templateUrl : '/pages/pichanga/pichanga.html',
            controller  : 'PichangaCtrl'
        })
        .when('/places', {
            templateUrl : 'pages/places/places.html',
            controller  : 'PlacesCtrl'
        })
        .when('/sessions', {
            templateUrl : 'pages/sessions/sessions.html',
            controller  : 'SessionCtrl'
        })
        .when('/crews', {
            templateUrl : '/pages/crews/crews.html',
            controller  : 'CrewsCtrl'
        })
        .when('/crews/:crewId', {
            templateUrl : '/pages/crew/crew.html',
            controller  : 'CrewCtrl'
        })
        .when('/employees', {
            templateUrl : 'pages/users/employees.html',
            controller  : 'EmployeesCtrl'
        })
        .when('/customers', {
            templateUrl : 'pages/users/customers.html',
            controller  : 'CustomersCtrl'
        })
        .when('/gatekeeper', {
            templateUrl : 'pages/gatekeeper/gatekeeper.html',
            controller  : 'GateKeeperCtrl'
        })
        .when('/print_templates', {
            templateUrl : 'pages/print_templates/print_templates.html',
            controller  : 'PrintTemplatesCtrl'
        })
        .when('/devices', {
            templateUrl : 'pages/devices/devices.html',
            controller  : 'DevicesCtrl'
        })
        .when('/:branch_id/employee', {
            templateUrl : 'pages/employee/data.html',
            controller  : 'employeeDataController'
        })
        .when('/:branch_id/item', {
            templateUrl : 'pages/item/data.html',
            controller  : 'itemDataController'
        })
    });