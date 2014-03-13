'use strict';

angular.module('musicApp')
  .controller('StartCtrl', function ($scope, $localStorage, $sessionStorage) {

  	$scope.$storage = $localStorage;
  	
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
