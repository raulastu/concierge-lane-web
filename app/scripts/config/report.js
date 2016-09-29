var app = angular.module('AdminModuleHF');
app.factory('MyBranch', function() {
        return {chain_id:-1,branch_id:-1,page_name:"dashboard#",report_page_name:"report#"};
    })
    .config(function($routeProvider) {
        $routeProvider
        .when('/:branch_id', {
            templateUrl : 'pages/order/data',
            controller  : 'cajaDataController'
        })
        .when('/:branch_id/venta', {
            templateUrl : 'pages/report/byday',
            controller  : 'byDayDataController'
        })
        .when('/:branch_id/venta_producto', {
            templateUrl : 'pages/report/byproduct',
            controller  : 'byProductDataController'
        })
        ;
    })
    ;