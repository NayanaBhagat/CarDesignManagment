var carApp = angular.module('carApp',['ngRoute','LocalStorageModule']);

carApp.controller('CarCtrl',function($scope,localStorageService){
    $scope.list=[];
    $scope.list= localStorage.getItem('session');
    $scope.list = $scope.list != null ? JSON.parse($scope.list) : [];
    $scope.save = function(car) {
      $scope.list.push($scope.car);
      localStorage.setItem('session',JSON.stringify($scope.list));
      $scope.list = JSON.parse(localStorage.getItem('session'));
      console.log($scope.list);
      $scope.car="";
     };	    	
		   
});


// app.controller("MaintCtrl", function(LS) {
//   this.greeting = "This is a localstorage demo app";
//   this.value = LS.getData();
//   this.latestData = function() {
//     return LS.getData();
//   };
//   this.update = function(val) {
//     return LS.setData(val);
//   };
// });



	
		
carApp.config(function ($routeProvider) {
	$routeProvider
	    .when('/',
            {
            	controller: 'CarCtrl',
            	templateUrl: 'partials/view1.html'
            })
	    .when('/view2',
            {
            	controller: 'CarCtrl',
            	templateUrl: 'partials/view2.html'
            })
	    .otherwise({redirectTo: '/'});
});

