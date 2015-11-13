'use strict';

angular.module('lingu')
  .controller('LoginCtrl',
    function ($scope, $rootScope) {

      $scope.userInfo = {
        username: "",
        password: ""
      };

      $scope.submitLoginRequest = function () {

      };

    });
