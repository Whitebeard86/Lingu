'use strict';

angular.module('lingu')
    .controller('MatchCtrl',
    function ($scope, $timeout, playerSvc) {
        $scope.currentCount = 0;
        $scope.player1 = playerSvc.playerInfo;

        $scope.callCounter = function () {
            $timeout(function () {
                if ($scope.currentCount != 60) {
                    $scope.currentCount++;
                    $scope.callCounter();
                }
            }, 1000);
        }

    });
