var app = angular.module('AdminModuleHF');
app.config(function($routeProvider) {
        $routeProvider
        .when('/:branch_id', {
            templateUrl : 'pages/branch/home',
            controller  : 'myBranchController'
        })
        .when('/:branch_id/category', {
            templateUrl : 'pages/category/data',
            controller  : 'categoryDataController'
        })
        .when('/:branch_id/table', {
            templateUrl : 'pages/table/data',
            controller  : 'TableController'
        })
        .when('/:branch_id/employee', {
            templateUrl : 'pages/employee/data',
            controller  : 'employeeDataController'
        })
        .when('/:branch_id/item', {
            templateUrl : 'pages/item/data',
            controller  : 'itemDataController'
        })
        ;
    })
    .factory('MyBranch', function() {
        return {chain_id:-1,branch_id:-1,page_name:"dashboard#",report_page_name:"report#",openurlBranh: function(t) {
                var to_url=MyBranch.page_name;
                switch(t){
                    case 'rr':to_url+="/"+MyBranch.branch_id;break;
                    case 're':to_url+="/"+MyBranch.branch_id+"/employee";break;
                    case 'rc':to_url+="/"+MyBranch.branch_id+"/category";break;
                    case 'ri':to_url+="/"+MyBranch.branch_id+"/item";break;
                    default :to_url+=MyBranch.branch_id;
                }
            }};
    });