var app = angular.module('AdminModuleHF');
app.directive("datepicker", function () {
      return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
          var updateModel = function (dateText) {
            scope.$apply(function () {
              ngModelCtrl.$setViewValue(dateText);
            });
          };
          var options = {
            dateFormat: "dd-mm-yy",
            onSelect: function (dateText) {
              updateModel(dateText);
            }
          };
          elem.datepicker(options);
        }
      }
    })
    .directive('chart', function () {
        var baseWidth = 350;
        var baseHeight = 250;
        return {
          restrict: 'E',
          template: '<canvas></canvas>',
          scope: {
            chartObject: "=value"
          },
          link: function (scope, element, attrs) {
            var canvas  = element.find('canvas')[0],
                context = canvas.getContext('2d'),
                chart;

            var options = {
              type:   attrs.type   || "Line",
              width:  attrs.width  || baseWidth,
              height: attrs.height || baseHeight
            };
            canvas.width = options.width;
            canvas.height = options.height;
            chart = new Chart(context);

            scope.$watch(function(){ return element.attr('type'); }, function(value){
              if(!value) return;
              options.type = value;
              var chartType = options.type;
              chart[chartType](scope.chartObject.data, scope.chartObject.options);
            });

            //Update when charts data changes
            scope.$watch(function() { return scope.chartObject; }, function(value) {
              if(!value) return;
              var chartType = options.type;
              chart[chartType](scope.chartObject.data, scope.chartObject.options);
            });
          }
        }
      })
;