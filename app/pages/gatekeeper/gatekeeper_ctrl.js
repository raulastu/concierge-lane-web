var app = angular.module(appName);

app.controller('GateKeeperCtrl', function($scope, $http, properties, GateKeeperEntry){

        console.log('GateKeeperCtrl');

        //$scope.newEntry = {}
        $scope.entries= GateKeeperEntry.query(); //query() returns all the entries

        //$scope.entry = new GateKeeperEntry(); //You can instantiate resource class

        $scope.buttonLabel = "Insert";

        $scope.insert = function(newEntry){
            if($scope.buttonLabel == "Update"){
                var data = GateKeeperEntry.update($scope.toBeUpdatedEntry, function() {
                    //$scope.newEntry=newEntry;
                    if(data.success){
                        $scope.buttonLabel = "Insert"
                        $scope.newEntry={};
                    }
                    console.log('updated Entry');
                });
            }else if ($scope.buttonLabel == "Insert") {
                console.log("Inserting");
                GateKeeperEntry.save(newEntry, function() {
                    $scope.entries.push(newEntry);
                    $scope.newEntry={};
                    console.log("save");
                    //data saved. do something here.
                }); //saves an entry. Assuming $scope.entry is the Entry object
            }

        };

        $scope.edit = function(selectedEntry){
            $scope.toBeUpdatedEntry = selectedEntry;
            $scope.newEntry = selectedEntry;
            $scope.newEntry._id = selectedEntry.name;
            $scope.buttonLabel = "Update";
        }

    //console.log(entries);
    //
    //    var entry = GateKeeperEntry.get({ id: $scope.id }, function() {
    //    console.log(entry);
    //}); // get() returns a single entry

});
