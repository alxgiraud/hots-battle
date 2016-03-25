/*global define, angular*/
define(['angularAMD', 'angular-route', 'roundProgress'], function (angularAMD) {
    'use strict';

    var app = angular.module('hots-match', ['ngRoute', 'angular-svg-round-progress']);

    app.constant('Constants', {
        TOTAL_MATCH: 10
    });

    app.config(['$httpProvider', function ($httpProvider) {

        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        //disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';

        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get.Pragma = 'no-cache';
    }]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", angularAMD.route({
                templateUrl: '../views/match.html',
                controller: 'MatchCtrl',
                controllerUrl: 'controllers/matchCtrl'
            }))
            .otherwise({
                redirectTo: '/'
            });
    });

    return angularAMD.bootstrap(app);
});
