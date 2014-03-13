'use strict';

angular.module('musicApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'fsCordova',
  'ngStorage'
])
  .config(function ($routeProvider, $sceDelegateProvider) {
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

      $sceDelegateProvider.resourceUrlWhitelist([
       'self',
       "https://embed.spotify.com/**"
      ]);
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
