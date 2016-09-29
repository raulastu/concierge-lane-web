angular.module('app.properties', []).provider('properties', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    var resource;
    $.ajax({
        url: '/properties',
        dataType: 'json',
        async: false,
        success: function(data) {
            resource  = data;
        }
    });
    this.properties= resource;
    this.$get = function() {
        return this.properties;
    };
});