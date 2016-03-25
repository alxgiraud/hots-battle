/*global require*/
require.config({
    baseUrl: "js",
    paths: {
        'angular': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular',
        'angular-route': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route',
        'angularAMD': 'https://cdn.jsdelivr.net/angular.amd/0.2/angularAMD.min',
        'roundProgress': './lib/roundProgress'
    },
    shim: {
        'angular-route': ['angular'],
        'angularAMD': ['angular'],
        'roundProgress': ['angular']
    },
    deps: ['app']
});
