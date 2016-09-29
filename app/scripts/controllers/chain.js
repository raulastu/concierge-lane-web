var app = angular.module('AdminModuleHF');
app.controller('branchDataController',['$scope','webStorage','$http','properties', '$location', 
                                       function($scope,webStorage,$http,properties, $location) {
        $scope.Chain=[];
        $scope.chain_id=webStorage.get('chain_id');
        $scope.user_email=webStorage.get('email');
        $scope.NewChain={'branch_name':'','branch_id':'','address':''};
        $scope.kitchenUrl = 'http://kitchen.huahfood.com';
        
        $scope.registerBranch=function(){
            var _url=properties.urlHost+'/branch';
            var _type='POST';
            $http({
                method: _type,
                url: _url,
                data: "branch_name="+$scope.NewChain.branch_name+"&chain_id="+$scope.chain_id+"&address="+$scope.NewChain.address,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
            })
            .success(function(data, status, headers, config) {
                if(data.success=="true"){
                    $scope.NewChain.branch_id=data.id;
                    $scope.Chain.push($scope.NewChain);
                }
                $scope.NewChain={'branch_name':'','branch_id':'','address':''};
            })
            .error(function(data, status, headers, config) {
                console.error(status);
            });
        }
        
        $scope.loginkitchen=function(branchId){
            var _url=properties.kitchenUrl+'/login/auth';
            var _type='POST';
            $http({
                method: _type,
                url: _url,
                data: "email="+webStorage.get('email')+"&branch_id="+branchId,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
            })
            .success(function(data, status, headers, config) {
//                window.location.href = _url;
                console.log(data);
                console.log(properties.kitchenUrl+data.redirect);
                window.location = properties.kitchenUrl+data.redirect;
            })
            .error(function(data, status, headers, config) {
                console.error(status);
            })
            ;
        }
        $scope.cerrarsesion=function(t){
            $http.post(properties.urlHost+'/admin/logout').success(function(data) {window.location='/';webStorage.clear()});
        }
        $http.get(properties.urlHost+'/admin/chains').then(
            function(data) {if(data.data.length>0)$scope.Chain = data.data[0].branches;},
            function(data) {
                if(data.status==500||data.status==401){
                    window.location.href = "/";
                }
            });
    }])