'use strict';

angular.module('lingu')
.controller('LoadingCtrl',
    function ($scope, playerSvc, comlayerSvc) {
        (function init() {
            playerSvc.changeState(1);

            // construct matchmaking request:
            comlayerSvc.send({
                action: 3 // matchmaking request
            });
        }());
    });
