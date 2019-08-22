var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {

	$routeProvider
		.when("/", {
			templateUrl: 'crudContent.html',
			controller: 'crudController'
		})

		.when("/update", {
			templateUrl: 'updateContent.html',
			controller: 'crudController'
		})
});

myApp.controller('updateController', function ($scope, $routeParams, $http, $window){
	$scope.name = $routeParams.name;
	$scope.year = Number($routeParams.year);
	$scope.wineType = $routeParams.wineType;
	$scope.self = $routeParams.self;


	$scope.update = function(self){
		console.log(self);
		$http.put(self, { name: $scope.name, year: $scope.year, wineType: $scope.wineType }).then(
			function (result) {
				alert('Update sucessful');
				$window.location.href = '/';
			}, function (data, status) {
				console.log(data, status);
			});
	}
});

myApp.controller('crudController', function ($scope, $http) {
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

	$scope.deleteWine = function (endPoint, i) {
		$http.delete(endPoint).then(
			function (result) {
				console.log(endPoint);
				$scope.wines.splice(i, 1);
			}, function (data, result) {
				console.log(endPoint);
			});

	}

});