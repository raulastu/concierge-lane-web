var app = angular.module(appName);

app.factory('GateKeeperEntry', function($resource, properties) {
    return $resource(properties.urlHost+'/1/admin/gatekeeper/entries', {id: '@_id'}, {
        update: {
            method: 'PUT'
        }
    }); // Note the full endpoint address
});

