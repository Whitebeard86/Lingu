// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('lingu', ['ionic', 'pascalprecht.translate'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .constant("config", {
        //SERVER_ADDRESS: "wss://nodejs-linguserver.rhcloud.com:8443"
        //SERVER_ADDRESS: "ws://nodejs-linguserver.rhcloud.com:8000"
        SERVER_ADDRESS: "ws://localhost:8000"
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html'
            })
            .state('rules', {
                url: '/rules',
                templateUrl: 'views/rules.html',
                cache: false
            })
            .state('registration', {
                url: '/registration',
                templateUrl: 'views/registration.html'
            })
            .state('scores', {
                url: '/scores',
                templateUrl: 'views/scores.html',
                cache: false
            })
            .state('match', {
                url: '/match',
                templateUrl: 'views/match.html',
                cache: false
            })
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                cache: false
            });
        $urlRouterProvider
            .otherwise('/login');
    })
    .config(function ($translateProvider) {
        $translateProvider.translations('en', EN_LANGUAGE);

        $translateProvider.translations('pt', PT_LANGUAGE);

        $translateProvider.preferredLanguage('en');
    });

