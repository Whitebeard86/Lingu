'use strict';

angular.module('lingu')
.controller('LoginCtrl',
    function ($rootScope, $scope, comlayerSvc, playerSvc, $location, $translate) {
        $scope.userInfo = {
            username: "",
            password: ""
        };

        $scope.login = function() {
            playerSvc.authenticate($scope.userInfo.username, $scope.userInfo.password).then(
                function () {
                   $location.path('home');
                    $scope.errorLogin = false;
                }, function (error) {
                    $scope.errorLogin = true;
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

        $scope.setLanguage = function(lan) {
            $translate.use(lan);
        };
    });
