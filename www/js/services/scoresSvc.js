'use strict';

angular.module('lingu')
.factory('scoresSvc',
    function ($q, comlayerSvc) {
        var scoresSvc = {};

        scoresSvc.getScores = function () {
            var defer = $q.defer();

            comlayerSvc.send({
                action: 7 // REQUEST_RANKING
            }).then(
                function (result) {
                    result = JSON.parse(result);
                    if (result) {
                        defer.resolve(result);
                    } else {
                        defer.reject();
                    }
                }, function (error) {
                    defer.reject(error);
                }
            );

            return defer.promise;
        };

        return scoresSvc;

    });
