var app = angular.module('AdminModuleHF');
app.filter('hourInDate', function() {
        return function(input) {
            var d=input.split(" ");
            var t=d[1].split(":");
            return t[0]+" : "+t[1];
        }
    })
;