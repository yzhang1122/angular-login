'use strict';

angular.module('Home')
    .controller('HomeController', ['$scope', 'AuthenticationService', '$location',
        function ($scope, AuthenticationService, $location) {

        $scope.logout = function () {
            AuthenticationService.ClearCredentials();
            $location.path('/login');
        }
    }]);