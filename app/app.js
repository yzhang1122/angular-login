'use strict';

// Declare app level module which depends on views, and components
angular.module('Authentication', []);
angular.module('Home', []);

angular.module('myApp', [
    'ngRoute',
    'Home',
    'Authentication',
    'ngCookies'
]).config(['$routeProvider', function ($routeProvider) {
    //$locationProvider.hashPrefix('!');

    $routeProvider
        .when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginController',
            hideMenus: true
        })
        .when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeController'

        })
        .otherwise({redirectTo: '/login'});

}])
    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {
            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });
        }]);