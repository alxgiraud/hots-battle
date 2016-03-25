/*global define, angular*/
define(['app', 'services/apiServices'], function (app) {
    'use strict';
    app.controller('MatchCtrl', ['$scope', '$timeout', '$interval', 'apiServices', function ($scope, $timeout, $interval, apiServices) {
        var winner,
            correctAnswers = 0,
            countdown,
            results = {
                UNDEFINED: -1,
                WRONG: 0,
                CORRECT: 1,
                TIMESUP: 2
            },

            matchHelper = {
                init: function () {
                    $scope.round = 0;
                    $scope.maxCounter = 200;
                    matchHelper.getRandomMatch();
                },

                getRandomMatch: function () {
                    $scope.matchReady = false;
                    apiServices.getRandomMatch().success(function (match) {
                        $scope.counter = $scope.maxCounter;

                        $scope.result = results.UNDEFINED;
                        winner = match.winner;

                        $scope.teams = match.teams;
                        $scope.map = match.map;

                        $scope.matchReady = true;
                        countdown = $interval(matchHelper.decreaseCountdown, 100);

                    }).error(function (error) {
                        $scope.matchReady = true;
                        $scope.error = 'Oups! An error occurred while getting the match...';

                    });
                },

                decreaseCountdown: function () {
                    if ($scope.counter > 0) {
                        $scope.counter -= 1;
                    } else {
                        matchHelper.stopCountdown();
                        $scope.result = results.TIMESUP;
                        $scope.round += 1;
                        $scope.successRate = correctAnswers / $scope.round;
                        $timeout(matchHelper.getRandomMatch, 1000);
                    }
                },

                stopCountdown: function () {
                    if (angular.isDefined(countdown)) {
                        $interval.cancel(countdown);
                        countdown = undefined;
                    }
                }
            };


        $scope.vote = function (result) {
            matchHelper.stopCountdown();

            $scope.result = (result === winner) ? results.CORRECT : results.WRONG;
            correctAnswers += $scope.result;
            $scope.round += 1;
            $scope.successRate = correctAnswers / $scope.round;

            $timeout(matchHelper.getRandomMatch, 1000);
        };

        matchHelper.init();
    }]);
});
