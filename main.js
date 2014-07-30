var carApp = angular.module('carApp',['ngRoute','LocalStorageModule']);

 carApp.factory('carService', function () {
        var carList = [];
        var carDetails= [];
        var CONSTANT_ID=0; 
        var car,item;
        carList= localStorage.getItem('session');
        carList = carList != null ? JSON.parse(carList) : [];
        return {
          saveCar:function (car) {
          car.id=localStorage.getItem('session1');
          CONSTANT_ID=CONSTANT_ID+1;
          car.id=CONSTANT_ID;
          localStorage.setItem('session1',car.id);
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
          },
          updateCar:function(id,car,type){
            for ( item in carList){
              if (carList[item].id == id){
                if(type==1){
                carList[item].seat = car.Seat;
                carList[item].door = car.Door;
                //carList[item]=localStorage.getItem('session2');
                //console.log(JSON.stringify(carList));
                }
                else if(type==2){
                //carList[item]=localStorage.getItem('session2');
                carList[item].duration = car.Duration;
                //localStorage.setItem('session2',carList[item]);
                }
                else
                {
                //carList[item]=localStorage.getItem('session2');
                carList[item].cost = car.Cost;
                //localStorage.setItem('session2',carList[item]);
                }
              } 
            }
            return carList[item];
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

carApp.controller('CarDetailsCtrl',function($scope,carService,$routeParams,localStorageService) {
  $scope.carDetails = [];
  $scope.carAttri = [];
  $scope.list = carService.getAllCars();
  $scope.carDetails = $scope.list[$routeParams.carId];
  $scope.design = false;
  $scope.manufacture = false;
  $scope.production = false;
  console.log("First:"+$scope.carAttri);
  //function for submitting design phase
  $scope.submit1 = false;
  $scope.manu=false;
  console.log("Outside the method "+JSON.stringify($scope.carDetails));

    $scope.designSubmit = function(car) {
      var type= 1;
       $scope.carDetails=carService.updateCar($scope.carDetails.id,car,type);
       $scope.submit1= true;
       $scope.manu=true;
       $scope.car="";
       localStorage.setItem('carSession',JSON.stringify($scope.carDetails));
       $scope.carAttri = JSON.parse(localStorage.getItem('carSession'));
       console.log("Second"+$scope.carAttri);
       return false;
    }
  

  //function for submitting manufacture phase
  $scope.submit2 = false;
  $scope.prod=false;
    $scope.manufSubmit = function(car) {
      var type = 2;
       $scope.carDetails=carService.updateCar($scope.carDetails.id,car,type);
        $scope.submit2= true;
        $scope.prod=true;
        $scope.car="";
        localStorage.setItem('carSession',JSON.stringify($scope.carDetails));
        $scope.carAttri = JSON.parse(localStorage.getItem('carSession'));
        console.log("third"+$scope.carAttri);
        return false;
    }



   //function for submitting prodcution phase  
  $scope.submit3 = false;
    $scope.prodSubmit = function(car) {
      var type = 3;
      $scope.carDetails=carService.updateCar($scope.carDetails.id,car,type);
      localStorage.setItem('session2',$scope.carDetails);
        $scope.submit3= true;
        $scope.car="";
        localStorage.setItem('carSession',JSON.stringify($scope.carDetails));
        $scope.carAttri = JSON.parse(localStorage.getItem('carSession'));
        console.log("fourth"+$scope.carAttri);
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

