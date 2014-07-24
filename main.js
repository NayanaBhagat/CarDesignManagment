var carApp = angular.module('carApp',['ngRoute','LocalStorageModule']);

 carApp.factory('carService', function () {
        var carList = [];
        var carDetails= [];
        carList= localStorage.getItem('session');
        carList = carList != null ? JSON.parse(carList) : [];
        return {
          saveCar:function (car) {
          carList.push(car);
          localStorage.setItem('session',JSON.stringify(carList));
          },
          getAllCars:function() {
          carList = JSON.parse(localStorage.getItem('session'));
          return carList;
          },
          deleteCar:function(index){
            carList.splice(index,1);
            localStorage.setItem('session',JSON.stringify(carList));
            return carList;
          }
        }
    });

carApp.controller('CarCtrl', function($scope,$location, $routeParams,carService,localStorageService){
    $scope.list=[];
    
    $scope.list = carService.getAllCars();
    $scope.save = function(car) {
      carService.saveCar(car);
      $scope.car="";
      $scope.list = carService.getAllCars();
     };

    $scope.deleteCar = function(index){
      $scope.list = carService.deleteCar(index);
    }  


    $scope.showCar = function(index){
       $location.path('/view2/'+index);
    }
	 
});

carApp.controller('CarDetailsCtrl',function($scope,carService,$routeParams) {
  $scope.list = carService.getAllCars();
  $scope.carDetails = $scope.list[$routeParams.carId]; 

  $scope.design = false;
  $scope.manufacture = false;
  $scope.production = false;

  $scope.submit1 = false;
  $scope.manu=false;
    $scope.designSubmit = function(car) {
        $scope.submit1= true;
        $scope.manu=true;
        $scope.car="";
        $scope.seat = car.seat;
        $scope.door = car.door;
        return false;
    }

  $scope.submit2 = false;
  $scope.prod=false;
    $scope.manufSubmit = function(car) {
        $scope.submit2= true;
        $scope.prod=true;
        $scope.car="";
        $scope.duration = car.duration;
        return false;
    }
  
  $scope.submit3 = false;
    $scope.prodSubmit = function(car) {
        $scope.submit3= true;
        $scope.car="";
        $scope.cost = car.cost;
        return false;
    }


 });


carApp.config(function ($routeProvider) {
	$routeProvider
	    .when('/',
            {
            	controller: 'CarCtrl',
            	templateUrl: 'partials/view1.html'
            })
	    .when('/view2/:carId',
            {
            	controller: 'CarDetailsCtrl',
            	templateUrl: 'partials/view2.html'
            })
	    .otherwise({redirectTo: '/'});
});

