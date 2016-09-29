var app = angular.module('AdminModuleHF');
app.controller('LoginController',['$scope','$http','webStorage','$animate','$element','properties', function($scope,$http,webStorage,$animate,$element,properties) {
        $scope.User={'chain_name':'','user_name':'','user_password':''};
        $scope.config_page={'padding_top':"padding-top:3%"};
        $scope.sh_login=true;
        $scope.sh_loading=false;
        $scope.sh_register=false;
        $scope.sh_alert=false;
        $scope.toRegister=function(){
            $scope.sh_login=false;
            $scope.sh_register=true;
            $scope.sh_loading=false;
            $scope.User={'chain_name':'','user_name':'','user_password':''};
            $scope.config_page.padding_top="padding-top:1%";
        }
        var redirect=function(data){
            webStorage.add('rooney',data.admrooney);
            webStorage.add('email',data.branch_admin_data.email);
            webStorage.add('chain_id',data.branch_admin_data.chain_id);
            webStorage.add('chain_name',data.branch_admin_data.first_name+" "+data.branch_admin_data.last_name);
            window.location.href = "chain";
        }
        $scope.toLogin=function(){
            $scope.sh_login=true;
            $scope.sh_register=false;
            $scope.sh_loading=false;
            $scope.User={'chain_name':'','user_name':'','user_password':''};
            $scope.config_page.padding_top="padding-top:3%";
        }
        $scope.register=function(data_register){
            $scope.sh_loading=true;
            var _url=properties.urlHost+'/admin';
            var _type='POST';
            $http({
                method: _type,
                url: _url,
                params: data_register,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
            })
            .success(function(data, status, headers, config) {
                    redirect(data);
                $scope.sh_loading=false;
                $scope.User={'chain_name':'','user_name':'','user_password':''};
            })
            .error(function(data, status, headers, config) {
                $scope.sh_loading=false;
                $scope.User={'chain_name':'','user_name':'','user_password':''};
            })
            ;
        }
        $scope.login=function(User){
            $scope.sh_loading=true;
            $scope.sh_alert=false;
            var _url=properties.urlHost+'/admin/login';
            var _type='POST';
            $http({
                method: _type,
                url: _url,
                data: "email="+User.user_name+"&password="+User.user_password,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
            })
            .success(function(data, status, headers, config) {
                if(data.message!="user not found"){
                    redirect(data);
                }else{
                    $scope.sh_loading=false;
                    $scope.sh_alert=true;
                    $scope.User={'chain_name':'','user_password':''};
                }
            })
            .error(function(data, status, headers, config) {
                $scope.sh_alert=true;
                $scope.sh_loading=false;
                $scope.User={'chain_name':'','user_name':'','user_password':''};
            })
            ;
        }
    }])
;