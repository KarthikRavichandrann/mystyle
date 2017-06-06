var app = angular.module('ToDoList', []);
app.controller('myCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/content').success(function(response) {
    console.log("I got the data I requested");
    
    $scope.todos = response;

  });
};

refresh();

$scope.addItem = function() {
  console.log($scope.todo._id);
  $http.put('/content/' + $scope.todo._id, $scope.todo).success(function(response) {
    console.log(response);
    refresh();
  })
};

$scope.removeItem = function(id) {

  $http.delete('/content/' + id).success(function(response) {
    $scope.todo=response;
    console.log(response);
    refresh();
  });
};

$scope.editItem = function(id) {

  $http.get('/content/' + id).success(function(response) {
    $scope.todo = response;
  });
};

$scope.saveItem = function() {

  $http.post('/content', $scope.todo).success(function(response) {
    refresh();
  })
};



}]);﻿
