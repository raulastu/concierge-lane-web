var app = angular.module('AdminModuleHF');

app.controller('myBranchController',['$scope','$http','$routeParams','properties','MyBranch', function($scope,$http,$routeParams,properties,MyBranch) {
        $scope.Branch=[];
        if($routeParams.branch_id!=null)
            MyBranch.branch_id=$routeParams.branch_id;
        else 
            return;
    
        $http.get(properties.urlHost+'/branches').success(
            function(data) {
                for(var i=0; i<data.length;i++)
                    if(data[i].branch_id==MyBranch.branch_id){
                        $scope.Branch = data[i];
                    }
            }
        ).error(function(data) {});
        $scope.image = "images/branch/banner1.jpg";
    }]);

app.controller('TableController',['$scope','$http','$routeParams','properties','MyBranch', function($scope,$http,$routeParams,properties,MyBranch) {
        $scope.Branch=[];
        if($routeParams.branch_id!=null)
            MyBranch.branch_id=$routeParams.branch_id;
        else return;
        $http.get(properties.urlHost+'/branches').success(
            function(data) {
                for(var i=0; i<data.length;i++)
                    if(data[i].branch_id==MyBranch.branch_id){
                        $scope.Branch = data[i];
                    }
            }
        ).error(function(data) {});
        $scope.Tables=[];
        $http.get(properties.urlHost+'/branches/'+MyBranch.branch_id+'/tables').success(
            function(data) {
                $scope.Tables=data;
            }
        ).error(function(data) {});
        $scope.image = "images/branch/banner1.jpg";
        $scope.numtable=1;
        $scope.addTable=function(){
            var sz=$scope.Tables.length+1;
            for(var i=0;i<$scope.numtable;i++){
                var newtbl=sz+i;
                var tb={'place':newtbl};
                $scope.Tables.push(tb);
                $http({
                    method:"POST", 
                    url: properties.urlHost+'/branches/'+MyBranch.branch_id+'/table?place='+(newtbl)
                }).success(function(data) {});
            }
        }
    }]);

app.controller('employeeDataController',
               ['$scope','$http','$routeParams','properties','MyBranch',
                function($scope, $http, $routeParams, properties, MyBranch) {
        var tmp_employee_id=-1,pos_empl=-1;
        if($routeParams.branch_id!=null)MyBranch.branch_id=$routeParams.branch_id;
        $scope.NewEmployee={'employee_id':'0','employee_name':'','employee_second_name':'','username':''};
        $scope.Employee=[];
        $scope.cancelEmployee=function(){
            $scope.NewEmployee={'employee_id':'0','employee_name':'','employee_second_name':'','username':''};
        }
        $scope.updEmployee=function(id_employee){
            for(var i=0;i<$scope.Employee.length;i++)
                if($scope.Employee[i].employee_id==id_employee){
                    var E=$scope.Employee[i];
                    $scope.NewEmployee={'employee_id':E.employee_id,'employee_name':E.employee_name,'employee_second_name':E.employee_second_name,'username':E.username};
                    pos_empl=i;
                    tmp_employee_id=id_employee;
                    break;
                }
        }
        $scope.saveEmployee=function(){
            var _url=properties.urlHost+'/employee';
            var _type='POST';
            if($scope.NewEmployee.employee_id!=0){//Update
                var _url=properties.urlHost+'/employee/'+$scope.NewEmployee.employee_id;
                var _type='PUT';
            }
            $scope.NewEmployee.branch_id = MyBranch.branch_id;
            $http({
                method:_type, 
                url: _url,
                params: $scope.NewEmployee
            }).success(function(data) {
                if(tmp_employee_id==-1){
                    $scope.NewEmployee.employee_id=data.id;
                    $scope.Employee.push($scope.NewEmployee);
                }else
                    $scope.Employee[pos_empl]=$scope.NewEmployee;
                
                $scope.NewEmployee={'employee_id':'0','employee_name':'','employee_second_name':'','username':''};
            });
        }
        $http.get(properties.urlHost+'/branch/'+$routeParams.branch_id+"/employees").success(
            function(data) {
                $scope.Employee = data;
            }
        );
    }]);

app.controller('categoryDataController', ['$scope','$http','$routeParams','properties','MyBranch', function($scope,$http,$routeParams,properties,MyBranch) {
        if($routeParams.branch_id!=null)MyBranch.branch_id=$routeParams.branch_id;
        $scope.Category=[];
        $http.get(properties.urlHost+'/branches/'+MyBranch.branch_id+'/categories').success(
            function(data) {$scope.Category = data;}
        );
        $scope.removeCat=function(obj){
            var id = obj.item_category_id;
            $http.delete(properties.urlHost+'/category/'+id).success(
                function(data) {
                    if(data.r=="success")
                    for (d in $scope.Category){
                        if($scope.Category[d].item_category_id==id){
                            $scope.Category.splice( d, 1 );
                            break;
                        }
                    }
                }
            );
        }
        var pos_cat=-1;
        $scope.NewCategory={'item_category_id':'0','category_name':"",'description':"",branch_id:""};
        $scope.updCategory=function(Category){
            for(var i=0;i<$scope.Category.length;i++)
                if($scope.Category[i].item_category_id==Category.item_category_id){
                    var E=$scope.Category[i];
                    $scope.NewCategory={'item_category_id':E.item_category_id,'category_name':E.category_name,'description':E.description,'branch_id':E.branch_id};
                    pos_cat=i;
                    break;
                }
        }
        $scope.cancelCategory=function(){
            $scope.NewCategory={'item_category_id':'0','category_name':"",'description':"",branch_id:""};
        }
        $scope.saveCategory=function(){
            var _url=properties.urlHost+'/category';
            var _type='POST';
            if($scope.NewCategory.item_category_id!=0){//Update
                var _url=properties.urlHost+'/category/'+$scope.NewCategory.item_category_id;
                var _type='PUT';
            }
            $http({
                method: _type,
                url: _url,
                data: "branch_id="+MyBranch.branch_id+"&category_name="+$scope.NewCategory.category_name+"&description="+$scope.NewCategory.description,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
            })
            .success(function(data){
                if($scope.NewCategory.item_category_id!=0){
                    $scope.Category[pos_cat]=$scope.NewCategory;
                }else{
                    $scope.NewCategory.item_category_id=data.data;
                    $scope.Category.push($scope.NewCategory);
                }
                $scope.NewCategory={'item_category_id':'0','category_name':"",'description':"",branch_id:""};
            });
        }
    }]);
app.controller('itemDataController', ['$scope','$http','$routeParams','MyBranch','properties', function($scope,$http,$routeParams,MyBranch,properties) {
        if($routeParams.branch_id!=null)MyBranch.branch_id=$routeParams.branch_id;
        $scope.Item=[];
//        $http.get(properties.urlHost+'/item/branch/'+MyBranch.branch_id).success(
        $http.get(properties.urlHost+'/item/chain/'+MyBranch.chain_id).success(
            function(data) {$scope.Item = data.data;}
        );
        $scope.search={'branch_id':MyBranch.branch_id};
        $scope.Category=[];
        $scope.NewItem={'item_id':'0','item_name':"",'inmenu':'1','price':'','item_category':$scope.Category[0],'branch_id':MyBranch.branch_id};
        $http.get(properties.urlHost+'/branches/'+MyBranch.branch_id+'/categories').success(
            function(data) {
                $scope.Category = data;
                $scope.NewItem.item_category = $scope.Category[0];
            }
        );
        var pos_updt=-1;
        $scope.updItem=function(Item){
            for(var i=0;i<$scope.Item.length;i++)
                if($scope.Item[i].item_id==Item.item_id){
                    var E=$scope.Item[i];
                    $scope.NewItem={'item_id':E.item_id,'item_name':E.item_name,'inmenu':E.inmenu,'price':E.price,'item_category':$scope.Category[0],'branch_id':MyBranch.branch_id};
                    pos_updt=i;
                    break;
                }
        }
        $scope.saveItem=function(){
            var _url=properties.urlHost+'/item';
            var _type='POST';
            if($scope.NewItem.item_id!=0){
                var _url=properties.urlHost + '/item/' + $scope.NewItem.item_id;
                var _type='PUT';
            }
            $http({
                method: _type,
                url: _url,
                data: "item_name="+$scope.NewItem.item_name+"&price="+$scope.NewItem.price+"&inmenu="+$scope.NewItem.inmenu+"&branch_id="+MyBranch.branch_id+"&item_category_id="+$scope.NewItem.item_category.item_category_id,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
            })
            .success(function(data){
                $scope.NewItem.category_name=$scope.NewItem.item_category.category_name;
                if($scope.NewItem.item_id!=0){
                    $scope.Item[pos_updt]=$scope.NewItem;
                }else{
                    $scope.NewItem.item_id=data.id;
                    $scope.Item.push($scope.NewItem);
                }
                $scope.NewItem={'item_id':'0','item_name':"",'inmenu':'1','price':'','item_category':$scope.Category[0],'branch_id':MyBranch.branch_id};
            });
        }
        $scope.removeItem=function(Item){
            $http.delete(properties.urlHost+'/item/'+Item.item_id).success(
                function(data) {}
            );
            var data=$scope.Item;
            for (d in data){
                if(data[d].item_id==Item.item_id){
                    $scope.Item.splice(d, 1 );
                    break;
                }
            }
        }
    }]);

app.controller('orderDataController', ['$scope','$http','Option','Vars','properties', function($scope,$http,Option,Vars,properties) {
        Option[Vars.activeMenu].liclass="";
        Vars.activeMenu=4;
        Option[Vars.activeMenu].liclass="active";
        $scope.Chain=[];
        $http.get(properties.urlHost+'/branch/chain/'+Vars.chain_id).success(
            function(data) {$scope.Chain = data.data;}
        );
    }]);
function openroute(t){
    var to_url=MyBranch.page_name;
    switch(t){
        case 'rr':to_url+="/"+MyBranch.branch_id;break;
        case 're':to_url+="/"+MyBranch.branch_id+"/employee";break;
        case 'rc':to_url+="/"+MyBranch.branch_id+"/category";break;
        case 'ri':to_url+="/"+MyBranch.branch_id+"/item";break;
        default :to_url+=MyBranch.branch_id;
    }
    window.location.href = to_url;
}