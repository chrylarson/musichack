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
  })

  .run(['$rootScope', '$location', '$localStorage', '$sessionStorage',  function ($rootScope, $location, $localStorage, $sessionStorage) {
        $rootScope.$storage = $localStorage;
        $rootScope.url = "http://sxsw.joehack3r.com:3000/";
        console.log($rootScope.$storage.email);
          if (typeof $rootScope.$storage.email !== 'undefined') {
            $location.path('');
          }
          else {
            $location.path('/start');
          }
    }]);
