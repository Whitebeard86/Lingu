'use strict';

angular.module('lingu')
.controller('LoginCtrl',
    function ($scope, comlayerSvc, playerSvc) {
        var socket;
        $scope.userInfo = {
            username: "",
            password: ""
        };

        $scope.login = function() {
            playerSvc.authenticate($scope.userInfo.username, $scope.userInfo.password).then(
                function () {
                    // TODO: handle login..
                    console.log(playerSvc.playerInfo);
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
