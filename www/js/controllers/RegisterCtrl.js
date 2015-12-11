'use strict';

angular.module('lingu')
.controller('RegisterCtrl',
    function ($scope, comlayerSvc) {
        var socket;
        $scope.userInfo = {
            email: "",
            username: "",
            password: ""
        };

        $scope.register = function() {
            //Register handler
        }
    });
