var carApp = angular.module('carApp',['ngRoute','LocalStorageModule']);

 carApp.factory('carService', function () {
        var carList = [];
        var carDetails= [];
        var CONSTANT_ID=0; 
        var car,item;
        carList= localStorage.getItem('session');

        return {
          saveCar:function (car) {      
          carList = carList != null ? carList : [];
          //car.id=localStorage.getItem('session1');
          CONSTANT_ID=CONSTANT_ID+1;
          console.log(CONSTANT_ID);
          car.id=CONSTANT_ID;
          console.log(car.id);
          console.log(car);
          carList.push(car);
          localStorage.setItem('session',JSON.stringify(carList));
          console.log(carList);
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
                carList[item].Seat = car.Seat;
                carList[item].Door = car.Door;
                }
                else if(type==2){
                carList[item].duration = car.Duration;
                }
                else{
                carList[item].cost = car.Cost;
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
    $scope.list = $scope.list != null ? $scope.list : [];
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
  $scope.list = carService.getAllCars();
  $scope.carDetails = $scope.list[$routeParams.carId];
  $scope.design = false;
  $scope.manufacture = false;
  $scope.production = false;
  //function for submitting design phase
  $scope.submit1 = false;
  $scope.manu= false;
  $scope.values = localStorage.getItem('UISession1');
  $scope.carAttri = JSON.parse(localStorage.getItem('carSession'));
  console.log($scope.carAttri);
  if($scope.values == true){
   $scope.manufacture =true ; 
  }

    $scope.designSubmit = function(car) {
      var type= 1;
       $scope.carAttri=carService.updateCar($scope.carDetails.id,car,type);
       $scope.submit1= true;
       $scope.car = "";
       $scope.manu=true;
       localStorage.setItem('UISession1',$scope.submit1,$scope.manu);
       localStorage.setItem('carSession',JSON.stringify($scope.carAttri));
       $scope.carAttri = JSON.parse(localStorage.getItem('carSession'));
       console.log("third"+$scope.carAttri);
       return false;
    }
  

  //function for submitting manufacture phase
  $scope.submit2 = false;
  $scope.prod=false;
    $scope.manufSubmit = function(car){
      var type = 2;
       $scope.carAttri=carService.updateCar($scope.carDetails.id,car,type);
        $scope.submit2= true;
        $scope.prod=true;
        $scope.car="";
        localStorage.setItem('UISession2',$scope.submit2,$scope.prod);
        localStorage.setItem('carSession',JSON.stringify($scope.carAttri));
        $scope.carAttri = JSON.parse(localStorage.getItem('carSession'));
        console.log("third"+$scope.carAttri);
        return false;
    }



   //function for submitting prodcution phase  
  $scope.submit3 = false;
    $scope.prodSubmit = function(car) {
      var type = 3;
      $scope.carAttri=carService.updateCar($scope.carAttri.id,car,type);
      localStorage.setItem('session2',$scope.carAttri);
        $scope.submit3= true;
        $scope.car="";
        localStorage.setItem('UISession3',$scope.submit3);
        localStorage.setItem('carSession',JSON.stringify($scope.carAttri));
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

