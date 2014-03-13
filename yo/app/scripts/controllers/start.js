'use strict';

angular.module('musicApp')
  .controller('StartCtrl', function ($scope, $localStorage, $sessionStorage, $location) {

  	$scope.$storage = $localStorage;

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.updateEmail = function (email) {
    	if(typeof $scope.email !== 'undefined') {
    		$scope.$storage.email = $scope.email;
    		$location.path('/');
    	} else if(typeof $scope.$storage.email !== 'undefined'){
    		$location.path('/');
    	}
    }

  });
