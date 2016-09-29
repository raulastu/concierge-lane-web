var app = angular.module(appName);

app.controller('UsersCtrl',function($scope, $http, UsersData, properties, $firebaseObject) {
    
    var config = {
      apiKey: "AIzaSyBK6aGfoK12dMjwWio_6G5LENS0fmQ03wo",
      authDomain: "vzchat-e392a.firebaseapp.com",
      databaseURL: "https://vzchat-e392a.firebaseio.com/point",
      storageBucket: "vzchat-e392a.appspot.com",
    };
    // firebaseObject.initializeApp(config);
    var ref = new Firebase(config.databaseURL);
     var obj = $firebaseObject(ref);

     // to take an action after the data loads, use the $loaded() promise
     obj.$loaded().then(function() {
        console.log("loaded record:", obj.$value);

       // To iterate the key/value pairs of the object, use angular.forEach()
       angular.forEach(obj, function(value, key) {
          console.log(key, value);
       });
     });

     // To make the data available in the DOM, assign it to $scope
     $scope.point = obj;

     // For three-way data bindings, bind it to the scope instead
     obj.$bindTo($scope, "point");



    var options = {
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: 'Concierge Lane'
                },
                subtitle: {
                    text: 'Verizon Oportunities:2016'
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Height (cm)'
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: 'Weight (kg)'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 100,
                    y: 70,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                    borderWidth: 1
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 6,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: '{point.x} cm, {point.y} kg'
                        }
                    }
                },
                series: [
                {
                    name: 'Customers',
                    marker: {
                        radius: 10
                    },
                    color: 'rgba(223, 83, 83, .5)',
                    data: [[26.5, 59.0], [15.5, 49.2], [25.0, 63.0], [15.8, 53.6],
                        [45.0, 33.0], [33.1, 14.6], [45.0, 13.8], [37.2, 1.8], [122.2, 75.2],
                        [33.5, 3.2], [25.9, 14.2], [37.9, 13.5], [35.4, 1.0], [16.0, 50.0],
                        [46.2, 12.8], [60.2, 15.2], [37.0, 13.2], [35.0, 47.8], [34.6, 14.8],
                        [125.5, 50.6], [35.0, 82.5], [35.8, 57.2], [26.5, 87.8], [33.2, 72.8],
                        [70.0, 54.5], [35.0, 40], [56.9, 67.3], [56.5, 67.8], [100.0, 100.0],
                        [56.4, 46.2], [126.0, 55.0], [67.5, 1.0], [16.0, 54.4], [55.0, 45.8],
                        [56.1, 45.6], [145.0, 73.2], [126.2, 5.1], [55.3, 67.9], [45.4, 56.6],
                        [47.9, 62.3], [45.8, 58.5], [45.6, 5.5], [45.0, 50.2], [45.3, 60.3],
                        [57.6, 5.3], [46.1, 56.2], [33.0, 5.2], [45.0, 72.9], [15.5, 59.8],
                        [57.6, 6.0], [16.7, 69.1], [126.2, 5.9],
                        {color: 'rgba(223, 1, 83, .5)',marker:{radius:25},x:16.2, y:33},
                        {color: 'rgba(223, 1, 83, .5)',marker:{radius:25},x:16.2, y:51.6}
                        ]

                }
                ]
            }
    var chart = Highcharts.chart('container',options);



    // Get a database reference to our posts
    var unwatch = obj.$watch(function(val) {
      console.log("data changed!");


        console.log("move")
        console.log(obj)
        // console.log(val)
        // console.log(chart.series[0])
        var x= 147.5
        var y = 51.8
        // chart.series[0].data[0].x=x;
        // chart.series[0].data[0].y=y;
        chart.series[0].data[0].update(obj) 
        // chart.series[0].setData(chart.series[0].data,false);
        // chart.redraw()
    });

    // chart.redraw();

    $scope.funcx = function(){
        console.log("funcx")
        console.log(chart.series[0])
        var x= 147.5
        var y = 51.8
        chart.series[0].addPoint([x,y]);
        // $scope.$apply()
    }
    $scope.move = function(){
        console.log("move")
        console.log(chart.series[0])
        var x= 147.5
        var y = 51.8
        chart.series[0].data[0].x=x;
        chart.series[0].data[0].y=y;
        chart.series[0].data[0].update({marker:{
            radius:100
        }})
        chart.redraw();
        // chart.series[0].setData(chart.series[0].data,true);


        // $scope.$apply()
    }
});