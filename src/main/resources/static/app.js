var myApp = angular.module('myApp', []);

myApp.controller('mainController', function ($scope) {
	$scope.wineTypes = ['Rosso', 'Bianco', 'Rosé'];

});

myApp.controller('crudController', function ($scope, $http, ) {
	$scope.name = '';
	$scope.year = '';
	$scope.wineType = 'RED';


		$http.get('/api/wines').then(
			function (result) {
				$scope.wines = result.data._embedded.wines;
				console.log(result)
			}, function (data, status) {
				console.log(data, status);
			});


	$scope.setWine = function () {
		$http.post('/api/wines', { name: $scope.name, year: $scope.year, wineType: $scope.wineType }).then(
			function (result) {
				$scope.name = '';
				$scope.year = '';
				//$scope.wineType = '';
				$scope.wines.push(result.data);
			}, function (data, status) {
				console.log(data, status);
			});
	}

	$scope.deleteWine = function(endPoint, i){
		$http.delete(endPoint).then(
			function(result){
				console.log(endPoint);
				$scope.wines.splice(i, 1);
			}, function(data, result){
				console.log(endPoint);
			});
			
	}

});