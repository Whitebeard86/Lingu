'use strict';

angular.module('lingu')
    .factory('gameSvc',
    function (comlayerSvc, $rootScope) {
        var gameSvc = {};
        var categories = ['COLORS', 'FRUITS'];
        var NUMBER_OF_CORRECT_ANSWERS = 0;
        var CURRENT_CATEGORY;
        var CURRENT_OPTION;
        var options;
        var matchId;

        comlayerSvc.addMessageHandler(function (message) {
            switch (message.action) {
                case 9:
                    $rootScope.$broadcast('OPPONENT_ANSWERED_CORRECTLY');
                    break;
            }
        });

        var game = {
            'COLORS': [
                {
                    img: '../../img/game/colors/Blue.png',
                    value: 'Blue',
                    options: ['Red', 'Green', 'Blue', 'Black']
                }
                ,
                {
                    img: '../../img/game/colors/Green.png',
                    value: 'Green',
                    options: ['Gray', 'Black', 'Blue', 'Green']
                },
                {
                    img: '../../img/game/colors/Magenta.png',
                    value: 'Magenta',
                    options: ['Black', 'Magenta', 'Blue', 'Yellow']
                },
                {
                    img: '../../img/game/colors/Red.png',
                    value: 'Red',
                    options: ['Black', 'Red', 'Blue', 'Gray']
                },
                {
                    img: '../../img/game/colors/Yellow.png',
                    value: 'Yellow',
                    options: ['Yellow', 'Red', 'Black', 'Green']
                }
            ],
            'FRUITS': [
                {
                    img: '../../img/game/fruit/Apple.png',
                    value: 'Apple',
                    options: ['Apple', 'Banana', 'Orange', 'Pineapple']
                }
                ,
                {
                    img: '../../img/game/fruit/Banana.png',
                    value: 'Banana',
                    options: ['Orange', 'Watermelon', 'Pineapple', 'Banana']
                },
                {
                    img: '../../img/game/fruit/Orange.png',
                    value: 'Orange',
                    options: ['Watermelon', 'Strawberry', 'Orange', 'Banana']
                },
                {
                    img: '../../img/game/fruit/Pineapple.png',
                    value: 'Pineapple',
                    options: ['Watermelon', 'Pineapple', 'Apple', 'Melon']
                },
                {
                    img: '../../img/game/fruit/Strawberry.png',
                    value: 'Strawberry',
                    options: ['Strawberry', 'Pineapple', 'Apple', 'Watermelon']
                }
            ]
        };

        var backup = angular.copy(game);


        function getCategory() {
            return categories[(Math.random() * (categories.length - 1)).toFixed(0)];
        }

        function getIndexOfOptionFromCategory() {
            return (Math.random() * (game[CURRENT_CATEGORY].length - 1)).toFixed(0);
        }

        gameSvc.endMatch = function() {
            comlayerSvc.send({
                action: 10, // game end
                matchId: matchId
            })
        };

        function addCorrectAnswer() {
            NUMBER_OF_CORRECT_ANSWERS = NUMBER_OF_CORRECT_ANSWERS + 1;
            comlayerSvc.send({
                action: 9,// PLAYER_ANSWERED_CORRECTLY
                matchId: matchId
            });
        }

        function setCurrentCategory() {
            CURRENT_CATEGORY = getCategory();
        }

        gameSvc.playMatch = function () {
            setCurrentCategory();
            var indexOfOptionFromCategory = getIndexOfOptionFromCategory();
            options = game[CURRENT_CATEGORY][indexOfOptionFromCategory];
            CURRENT_OPTION = options;
            game[CURRENT_CATEGORY].splice(indexOfOptionFromCategory, 1);

            //play gain
            if(!options) {
                game = angular.copy(backup);
                gameSvc.playMatch();
            }

            return options;
        };

        gameSvc.setMatchId = function (mId) {
            matchId = mId;
        };

        gameSvc.checkAnswer = function (answer) {
            if (answer === CURRENT_OPTION.value) {
                addCorrectAnswer();
            } else {

            }
            var indexOfOptionFromCategory = getIndexOfOptionFromCategory();
            options = game[CURRENT_CATEGORY][indexOfOptionFromCategory];
            CURRENT_OPTION = options;
            game[CURRENT_CATEGORY].splice(indexOfOptionFromCategory, 1);

            return options;
        };

        gameSvc.getCorrectAnswers = function () {
            return NUMBER_OF_CORRECT_ANSWERS;
        };

        return gameSvc;

    });
