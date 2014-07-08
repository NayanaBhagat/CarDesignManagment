var carApp = angular.module('carApp',['ngRoute']);

carApp.controller('CarCtrl',function($scope){
	// function to submit the form after all validation has occurred			
	$scope.list = [];
   
    $scope.submit = function() {    
    $scope.list.push($scope.car);
    //$scope.list.push(this.carType);
    //$scope.list.push(this.carGear);
    //$scope.carName = '';
    //$scope.carType = '';
    //$scope.carGear = '';
    console.log($scope.car);
    $scope.car="";
    };	    	
		
});
// $scope.states = [
// 	  {name: 'Goa', capital: 'Panjim'},
// 	  {name: 'Kerela', capital: 'Trivandrum'},
// 	  {name: 'Karnataka', capital: 'Banglore'}
// 	];
// // $scope.reverseMessage = function () {
// // 	return $scope.data.message.split("").reverse().join("");
// // }	
// });

// myApp.filter('reverse',function(){
// 	return function(text){
// 		return text.split("").reverse().join("");
// 	}
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