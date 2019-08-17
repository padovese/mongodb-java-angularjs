var myApp = angular.module('myApp', []);

myApp.controller('mainController', function ($scope) {
	$scope.wineTypes = ['Rosso', 'Bianco', 'Rosé'];

});

myApp.controller('crudController', function ($scope, $http) {
	$scope.name = '';
	$scope.year = '';
	$scope.wineType = '';

	//$scope.getResults = function () {
		$http.get('/api/wines').then(
			function (result) {
				$scope.wines = result.data._embedded.wines;
				console.log($scope.wines);
				console.log(result)
			}, function (data, status) {
				console.log(data, status);
			});
	//}

	$scope.setWine = function () {
		$http.post('/api/wines', { name: $scope.name, year: $scope.year, wineType: $scope.wineType }).then(
			function (result) {
				$scope.name = '';
				$scope.year = '';
				$scope.wineType = '';

				console.log(result);

				$scope.wines.push(result.data);
			}, function (data, status) {
				console.log(data, status);
			});
	}

});