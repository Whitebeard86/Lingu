'use strict';

angular.module('lingu')
    .controller('MatchCtrl',
    function ($scope, $timeout, playerSvc, comlayerSvc, gameSvc) {
        $scope.loading = true;
        $scope.currentCount = 30;
        $scope.player1 = playerSvc.playerInfo;
        $scope.player1.correctAnswers = 0;
        $scope.player2 = {};

        playerSvc.changeState(1);

        // construct matchmaking request:
        comlayerSvc.send({
            action: 3 // matchmaking request
        });

        $scope.timer = function () {
            $timeout(function () {
                if ($scope.currentCount != 0) {
                    $scope.currentCount--;
                    $scope.timer();
                }
            }, 1000);
        };

        $scope.timerLessThan10S = function () {
            return $scope.currentCount < 10;
        };

        $scope.checkAnswer = function (answer) {
            $scope.option = gameSvc.checkAnswer(answer);
            $scope.player1.correctAnswers = gameSvc.getCorrectAnswers();
            if(!$scope.option) {
                $scope.elapsedTime = 30 - $scope.currentCount;
            }
        };

        $scope.$on('BEGIN_GAME', function (e, players) {
            $scope.loading = false;
            //TODO: we need to have better to way to check who is player 1 and player 2

            $scope.player2.name = isSamePlayer(players[0].email) ? players[1].name : players[0].name;
            $scope.player2.xp = isSamePlayer(players[0].email) ? players[1].experience : players[0].experience;
            $scope.player2.avatar = isSamePlayer(players[0].email) ? players[1].avatar : players[0].avatar;
            $scope.player2.correctAnswers = 0;
            $scope.timer();

            $scope.option = gameSvc.playMatch();

            $scope.$apply();
        });

        function isSamePlayer(email) {
            return $scope.player1.email === email;
        }
    });
