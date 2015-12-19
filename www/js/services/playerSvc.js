'use strict';

angular.module('lingu')
.factory('playerSvc',
    function ($q, comlayerSvc) {
        var svc = {};
        svc.playerInfo = {};

        svc.authenticate = function (username, password) {
            var defer = $q.defer();

            comlayerSvc.send({
                action: 2, // login
                username: username,
                password: password
            }).then(
                function (result) {
                    result = JSON.parse(result);
                    if (result) {
                        svc.playerInfo = {
                            id: result.id,
                            name: result.name,
                            email: result.email,
                            avatar: result.avatar,
                            xp: result.experience
                        };

                        defer.resolve();
                    } else {
                        defer.reject();
                    }
                }, function (error) {
                    console.log(error);
                    defer.reject(error);
                }
            );

            return defer.promise;
        };

        return svc;

    });
