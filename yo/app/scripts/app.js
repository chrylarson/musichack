'use strict';

angular.module('musicApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'fsCordova'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });