'use strict';

angular.module('lingu')
.factory('comlayerSvc',
    function ($q, config) {
        var svc = {},
            socket,
            connected;

        svc.messageHandlers = [];

        svc.addMessageHandler = function (handler) {
            svc.messageHandlers.push(handler);
        };

        svc.isConnected = function () {
            return svc.connected;
        };

        svc.connect = function () {
            var deferred = $q.defer();
            if (!connected) {
                socket = io(config.SERVER_ADDRESS);

                socket.on('connect', function () {
                    console.log("connected to server");
                    svc.connected = true;
                    deferred.resolve();
                });

                socket.on('message', function (message) {
                    console.log("raw message received: " + message);

                    var decoded = JSON.parse(message);
                    for (var k in svc.messageHandlers) {
                        if(svc.messageHandlers[k]) {
                            svc.messageHandlers[k](decoded);
                        }
                    }
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
