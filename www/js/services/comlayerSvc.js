'use strict';

angular.module('lingu')
    .factory('comlayerSvc',
    function ($q) {
        var svc = {},
            socket,
            connected;

        svc.connect = function () {
            var deferred = $q.defer();
            if (!connected) {
                socket = io('ws://172.18.135.193:8080');

                socket.on('connect', function () {
                    console.log("connected to server");
                    connected = true;
                    deferred.resolve();
                });

                socket.on('disconnect', function () {
                    console.log("disconnected from server");
                    connected = false;
                    deferred.reject();
                });
                return deferred.promise;
            }
            return $q.reject();
        };

        svc.send = function (content) {
            if (connected) {
                var deferred = $q.defer();

                socket.emit('message', JSON.stringify(content), function (error, message) {
                        if (error) {
                            deferred.reject(error);
                        } else {
                            deferred.resolve(message);
                        }
                    }
                );
                return deferred.promise;
            }
            return $q.reject();
        };

        return svc;

    });
