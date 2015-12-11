'use strict';

angular.module('lingu')
.controller('LoginCtrl',
    function ($scope, comlayerSvc) {
        var socket;
        $scope.userInfo = {
            username: "",
            password: ""
        };

        $scope.login = function() {
            comlayerSvc.send({
                action: 2,
                username: $scope.userInfo.username,
                password: $scope.userInfo.password
            }).then(
                function (result) {
                    console.log(result);
                }, function (error) {
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
