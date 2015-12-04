'use strict';

angular.module('lingu')
    .controller('LoginCtrl',
    function ($scope, comlayerSvc) {
        var socket;
        $scope.userInfo = {
            username: "",
            password: ""
        };

        $scope.submitLoginRequest = function () {
            comlayerSvc.connect().then(function(){
                comlayerSvc.send({
                    action: 2,
                    username: $scope.userInfo.username,
                    password: $scope.userInfo.password
                })
            }, function(){

            });

        };

    });
