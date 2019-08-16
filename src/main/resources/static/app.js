var myApp = angular.module('myApp', []);

myApp.controller('mainController', function ($scope) {
	$scope.wineTypes = ['Rosso', 'Bianco', 'Rosé'];

});

myApp.controller('crudController', function ($scope, $http) {
	$scope.customers = '';

	$scope.getResults = function(){

	$http.get('/api/customers').then(
		function(result){
			$scope.customers = result.data._embedded.customers;
			console.log($scope.customers);
			console.log(result)
		}, function(data, status){
			console.log(data, status);
		});

	}

});