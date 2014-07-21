var carApp = angular.module('carApp',['ngRoute','LocalStorageModule']);

carApp.controller('CarCtrl',function($scope,localStorageService){
    $scope.list=[];
    $scope.list= localStorage.getItem('session');
    $scope.carDetails = []; 
    $scope.list = $scope.list != null ? JSON.parse($scope.list) : [];
    $scope.save = function(car) {
      $scope.list.push($scope.car);
      localStorage.setItem('session',JSON.stringify($scope.list));
      $scope.list = JSON.parse(localStorage.getItem('session'));
      console.log($scope.list);
      $scope.car="";
     };

    $scope.deleteCar = function(index){
      $scope.list.splice(index,1);
      console.log($scope.list);
      localStorage.setItem('session',JSON.stringify($scope.list));
    }; 

    $scope.showCar = function(index){
     alert(JSON.stringify($scope.list[index]));
     $scope.carDetails.push(JSON.stringify($scope.list[index])); 
     console.log($scope.carDetails);
     alert($scope.carDetails);
    };
	 
});


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

