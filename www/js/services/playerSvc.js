'use strict';

angular.module('lingu')
.factory('playerSvc',
    function ($q, comlayerSvc, $location, $rootScope) {
        var svc = {};
        svc.playerInfo = {};
        svc.state = 0; // 0 = idle; 1 = matchmaking; 2 = playing

        comlayerSvc.addMessageHandler(function(message) {
            switch(message.action) {
                case 4: // matchmaking ready
                    // is the player still in matchmaking?
                    if(svc.state == 1) {
                        comlayerSvc.send({
                            action: 5,
                            matchId: message.matchId
                        });
                    }

                    break;
                case 6:
                    $rootScope.$broadcast('BEGIN_GAME', message.players);
                    break;
            }
        });

        svc.changeState = function(newState) {
          svc.state = newState;
        };

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
