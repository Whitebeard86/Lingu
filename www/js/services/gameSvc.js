'use strict';

angular.module('lingu')
    .factory('gameSvc',
    function () {
        var gameSvc = {};
        var categories = ['COLORS'];
        var NUMBER_OF_CORRECT_ANSWERS = 0;
        var CURRENT_CATEGORY;
        var CURRENT_OPTION;
        var options;
        var optionsChosen;

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
            ]
            /*,
             'FRUIT': {
             'APPLE': '../../img/game/fruit/Apple.png',
             'BANANA': '../../img/game/fruit/Banana.png',
             'ORANGE': '../../img/game/fruit/Orange.png',
             'PINEAPPLE': '../../img/game/fruit/Pineapple.png',
             'STRAWBERRY': '../../img/game/fruit/Strawberry.png',
             options: ['Apple', 'Banana', 'Orange', 'Pineapple', 'Strawberry', 'Watermelon', 'Melon']
             }*/
        };


        function getCategory() {
            return categories[(Math.random() * (categories.length - 1)).toFixed(0)];
        }

        function getIndexOfOptionFromCategory() {
            return (Math.random() * (game[CURRENT_CATEGORY].length - 1)).toFixed(0);
        }


        function addCorrectAnswer() {
            NUMBER_OF_CORRECT_ANSWERS = NUMBER_OF_CORRECT_ANSWERS + 1;
            //broadcast to the core
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
            return options;
        };

        gameSvc.checkAnswer = function (answer) {
            if(answer === CURRENT_OPTION.value) {
                addCorrectAnswer();
            } else {

            }
            var indexOfOptionFromCategory = getIndexOfOptionFromCategory();
            options = game[CURRENT_CATEGORY][indexOfOptionFromCategory];
            CURRENT_OPTION = options;
            game[CURRENT_CATEGORY].splice(indexOfOptionFromCategory, 1);

            return options;
        };

        gameSvc.getCorrectAnswers = function() {
            return NUMBER_OF_CORRECT_ANSWERS;
        };

        return gameSvc;

    });
