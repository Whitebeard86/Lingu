'use strict';

angular.module('lingu')
    .controller('RankingCtrl',
    function ($scope, scoresSvc) {
        $scope.players = [];

        function processPlayers(players) {
            $scope.players = players;
        }

        (function init(){
            scoresSvc.getScores().then(function(players) {
                processPlayers(players);
            });
        }())
    });
