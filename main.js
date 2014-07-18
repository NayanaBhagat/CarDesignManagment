var carApp = angular.module('carApp',['ngRoute','LocalStorageModule']);

carApp.controller('CarCtrl',function($scope,localStorageService){
    $scope.a = [];
    $scope.list=[];
    $scope.list= JSON.parse(localStorage.getItem('session3'));
    //localStorage.setItem('session', JSON.stringify($scope.a));
    // console.log(a);
    $scope.save = function(car) {
      localStorage.setItem('session2',JSON.stringify(car));
      $scope.a = JSON.parse(localStorage.getItem('session2'));
      $scope.list.push($scope.a);
      localStorage.setItem('session3',JSON.stringify($scope.list));
      $scope.list = JSON.parse(localStorage.getItem('session3'));
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

