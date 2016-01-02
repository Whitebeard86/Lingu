'use strict';

angular.module('lingu')
    .factory('gameSvc',
    function () {
        var gameSvc = {};
        var categories = ['COLORS', 'FRUITS'];
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
            ,
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
