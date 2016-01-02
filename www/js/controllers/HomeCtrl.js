'use strict';

angular.module('lingu')
    .controller('HomeCtrl',
    function ($scope, playerSvc) {
        $scope.userInfo = {};
        var POINTS_TO_REACH_NEXT_LEVEL = 5;

        //public functions
        $scope.logout = function () {
            playerSvc.logout();
        };


        //private functions
        function setLevel() {
            var level = $scope.userInfo.xp / POINTS_TO_REACH_NEXT_LEVEL;
            $scope.userInfo.level = parseInt(level);
            $scope.userInfo.xp = (level % 1).toFixed(4) * 100;
        }

        (function init() {
            $scope.userInfo.username = playerSvc.playerInfo.name;
            $scope.userInfo.email = playerSvc.playerInfo.email;
            $scope.userInfo.xp = playerSvc.playerInfo.xp;
            $scope.userInfo.avatar = playerSvc.playerInfo.avatar;
            setLevel();
        }());


    });
