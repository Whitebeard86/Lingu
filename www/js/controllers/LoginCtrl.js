'use strict';

angular.module('lingu')
    .controller('LoginCtrl',
    function ($scope, $rootScope) {
        var socket;
        $scope.userInfo = {
            username: "",
            password: ""
        };

        $scope.submitLoginRequest = function () {
            socket = io('ws://172.18.135.193:8080');

            socket.on('connect', function () {
                console.log("connected to server");
                socket.emit('message', JSON.stringify(
                    {
                        action: 2,
                        username: $scope.userInfo.username,
                        password: $scope.userInfo.password
                    }));
            });
        };

    });
