'use strict';

angular.module('lingu')
.factory('comlayerSvc',
    function ($q) {
        var svc = {},
            socket,
            connected;

        svc.isConnected = function() {
            return svc.connected;
        };

        svc.connect = function () {
            var deferred = $q.defer();
            if (!connected) {
                socket = io('ws://localhost:8080');

                socket.on('connect', function () {
                    console.log("connected to server");
                    svc.connected = true;
                    deferred.resolve();
                });

                socket.on('disconnect', function () {
                    console.log("disconnected from server");
                    svc.connected = false;
                    deferred.reject();
                });
                return deferred.promise;
            }
            return $q.reject();
        };

        svc.send = function (content) {
            if (svc.connected) {
                var deferred = $q.defer();

                socket.emit('message', JSON.stringify(content), function (result) {
                        deferred.resolve(result);
                    }
                );
                return deferred.promise;
            }
            return $q.reject();
        };

        return svc;

    });
