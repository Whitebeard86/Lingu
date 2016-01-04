'use strict';

angular.module('lingu')
.controller('RulesCtrl',
    function ($scope, $translate) {
       $scope.howtoplay = $translate.instant('howtoplay');
    });
