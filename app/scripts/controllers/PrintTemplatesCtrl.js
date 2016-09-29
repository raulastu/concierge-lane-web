app.controller('PrintTemplatesCtrl',
    function($scope, $rootScope, $http,$routeParams,properties) {

        //console.log(MyBranch);
        //if($routeParams.branch_id!=null)
        //    MyBranch.branch_id=$routeParams.branch_id;
        //else return;

        //$scope.branch = $rootScope.branch;
        //---------------------------------------------

        $scope.getPopulatedPrint = function(printTemplate, branch, order){
            console.log('getPopulatedPrint');
            var res = printTemplate.template;
            res = res.replace(/\$\$COMPANY_NAME/g, branch.branch_name);
            res = res.replace(/\$\$COMPANY_SLOGAN/g, branch.page_motto);
            res = res.replace(/\$\$COMPANY_ADDRESS/g, branch.address);
            res = res.replace(/\$\$COMPANY_PHONE_NUMBER/g, branch.page_delivery_number);
            res = res.replace(/\$\$COMPANY_RUC/g, branch.RUC);
            res = res.replace(/\$\$DATETIME/g, order.pay_time);
            //'14/03/2015-09:29:06 p.m'
            res = res.replace(/\$\$BUYER_COMPANY_NAME/g, order.customer_company_name);
            //"Terremark S.A.C"
            res = res.replace(/\$\$BUYER_RUC/g, order.customer_RUC);
            res = res.replace(/\$\$ORDER_ID/g, order.order_id);

            res = res.replace(/\$\$CAJERO/g, order.cashier_employee_name);

            var total = 0;
            if(order.item_instances){
                var leftWidth =  ("Cant. ProductoSubtotal\n").length;
                var dotWidth = printTemplate.width - leftWidth;
                var dots = "";
                for(var j=0; j<dotWidth; j++){
                    dots+=' ';
                }
                var items = order.item_instances;
                var tmpItems = "Cant. Producto"+dots+"Subtotal\n";

                for(var i = 0; i < order.item_instances.length; i++){
                    var qty = order.item_instances[i].count;

                    var leftWidth =  (qty+" "+ items[i].item_name+ (qty*items[i].price)+"\n").length;

                    var dotWidth = printTemplate.width - leftWidth;
                    var dots = "";
                    for(var j=0; j<dotWidth; j++){
                        dots+='.';
                    }
                    tmpItems  += qty+" "+ items[i].item_name + dots + (qty*items[i].price)+"\n";
                    total += (parseInt(qty)*parseInt(items[i].price));
                }
                $scope.tmpItems  = tmpItems;
                res = res.replace(/\$\$PRODUCT_LIST/g, tmpItems);
            }

            res = res.replace(/\$\$VENTA_TOTAL_SOLES/g, total);

            $scope.receipt_length = res.match(/\n/g);

            // keep it at last
            var multiplicationRegex = /\$\$\((.*)\*(.*)\)/;
            while(res.match(multiplicationRegex)){
                var tmpres = res.match(multiplicationRegex);
                var opRes = tmpres[1]*tmpres[2];
                res = res.replace(multiplicationRegex, opRes);
            }
            return res;
        }

        ///emp/branch/:branchId/print/templates
        $http.get(properties.urlHost+'/defaults/print/templates').success(
            function(data) {
                $scope.printTemplates = data;
                $scope.sampleOrder = data.sample_order;
            }
        );

        //$http.get(properties.urlHost+'/branches/print/templates/order/sample').success(
        //    function(data) {
        //        $scope.sampleOrder = data;
        //    }
        //);


        $scope.printPopulatedPrint = function(print) {
            var printContents = document.getElementById("area-print").innerHTML;
            var popupWin = window.open('', '_blank', 'width=500px,height=720px');
            popupWin.document.open();
            var printableReceipt = print.replace(/\n/g,"<br/>");
            var printableReceipt = printableReceipt.replace(/\s/g,"&nbsp;");
            popupWin.document.write(
                '<html><head><link rel="stylesheet" type="text/css" href="css/print-invoice.css" onload="window.print()"/></head><body ">' + printableReceipt + '</html>');
            //onload="window.print()
            popupWin.document.close();
        }


        $scope.savePrintTemplate = function(printTemplate){
            console.log(MyBranch);
            $http(
                {
                    method:"PUT",
                    url:properties.urlHost+'/branches/'+MyBranch.branch_id+'/print/template/'+printTemplate.name,
                    data:printTemplate
                }
            ).success(function(data){
                    console.log(data);
            });
        }

        $scope.setSelectedTemplate = function(template){
            $scope.selectedTemplate = '';
            $scope.selectedTemplate = template;
            //$scope.selectedTemplatePreview = $scope.getPopulatedPrint(template, $scope.branch, $scope.sampleOrder)
            $.apply();
        }
    });