
var app = angular.module(appName);
app.directive('branchActivity', [function() {
        return {
            restrict: 'E',
            templateUrl: 'pages/activity/branch-activity.html'
        }
    }]);

app.directive('branches', [function() {
    return {
        restrict: 'E',
        templateUrl: 'pages/activity/branches.html'
    }
}]);