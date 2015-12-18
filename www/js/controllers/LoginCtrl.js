'use strict';

angular.module('lingu')
.controller('LoginCtrl',
    function ($rootScope, $scope, comlayerSvc, playerSvc, $location) {
        $scope.userInfo = {
            username: "",
            password: ""
        };

        $scope.login = function() {
            playerSvc.authenticate($scope.userInfo.username, $scope.userInfo.password).then(
                function () {
                   $location.path('home');
                }, function (error) {
                    // TODO: retry?
                    console.log(error);
                }
            )
        };

        $scope.submitLoginRequest = function () {
            if(!comlayerSvc.isConnected()) {
                comlayerSvc.connect().then(function () {
                    $scope.login();
                }, function () {

                });
            } else {
                $scope.login();
            }
        };
    });
