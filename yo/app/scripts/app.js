'use strict';

angular.module('musicApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'fsCordova',
  'ngStorage'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/start', {
        templateUrl: 'views/start.html',
        controller: 'StartCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
