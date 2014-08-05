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
          CONSTANT_ID = JSON.parse(localStorage.getItem('carID'));
          CONSTANT_ID=CONSTANT_ID+1;
          car.id=CONSTANT_ID;
          localStorage.setItem('carID',JSON.stringify(CONSTANT_ID));
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
          updateCar:function(carDetails,car,type){
            angular.forEach(carList,function(item){
              if(item.id == carDetails.id){
                if(type==1){
                item.Seat = car.Seat;
                item.Door = car.Door;
                }
                else if(type==2){
                  item.Duration = car.Duration;
                }
                else{
                  item.Cost = car.Cost;
                }
              localStorage.setItem('session',JSON.stringify(carList));
              return carList
              }
            });
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
    $scope.editCar = function(index){
      alert("hello");
    }
});



carApp.controller('CarDetailsCtrl',function($scope,carService,$routeParams,localStorageService) {
  $scope.carDetails = [];
  $scope.list = carService.getAllCars();
  $scope.carDetails = $scope.list[$routeParams.carId];
  // $scope.design = false;
  // $scope.manufacture = false;
  // $scope.production = false;
  // $scope.submit1 = false;
  // $scope.manu= false;
  // $scope.submit2 = false;
  // $scope.prod=false;
  // $scope.submit3 = false;

  if(($scope.carDetails.Seat && $scope.carDetails.Door) != null)
  {
    $scope.manu=true;
  }
  else{
    $scope.manufacture = false;
    $scope.manu=false;
  }

  if($scope.carDetails.Duration != null){
    $scope.prod = true;
  }
  else{
     $scope.production  = false;
    $scope.prod = false;
  }

  //function for submitting design phase
    $scope.designSubmit = function(car) {
      var type= 1;
      console.log("Inside 1" + JSON.stringify($scope.list));
       carService.updateCar($scope.carDetails,car,type);
       $scope.submit1= true;
       $scope.car = "";
       $scope.manu=true;
       return false;
    }
  

  //function for submitting manufacture phase
    $scope.manufSubmit = function(car){
      var type = 2;
        carService.updateCar($scope.carDetails,car,type);
        console.log("carDetails + 2" + JSON.stringify($scope.carDetails));
        $scope.submit2= true;
        $scope.prod=true;
        $scope.car="";
        return false;
    }


   //function for submitting prodcution phase  

    $scope.prodSubmit = function(car) {
      var type = 3;
      carService.updateCar($scope.carDetails,car,type);
      console.log("carDetails + 3" + JSON.stringify($scope.carDetails));
      $scope.submit3= true;
      $scope.car="";
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

