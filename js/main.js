jQuery(document).ready(function ($) {
"use strict";

    //POSTERS//

    function poster(censored, uncensored, answerOne, answerTwo, answerThree, correctAnswer, answers) {
        this.censored = censored;
        this.uncensored = uncensored;
        this.answerOne = answerOne;
        this.answerTwo = answerTwo;
        this.answerThree = answerThree;
        this.correctAnswer = correctAnswer;
        this.answers = [answerOne, answerTwo, answerThree, correctAnswer];
        this.randomAnswers = shuffle(this.answers);
    }
    var posterOne = new poster("gonebabygone_c", "gonebabygone_u", "Mystic River", "Eastern Promises", "The Town", "Gone Baby Girl");
    var posterTwo = new poster("oculus_c", "oculus_u","Sinister", "Insidious", "The Conjuring", "Oculus");
    var posterThree = new poster("drive_c", "drive_u", "Rush", "Bronson", "Blue Valentine", "Drive");
    var posterFour = new poster("zodiac_c","zodiac_u", "The Game", "Panic Room", "Source Code", "Zodiac");
    var posterFive = new poster("silverliningsplaybook_c","silverliningsplaybook_u", "Friends With Benefits", "Crazy Stupid Love", "American Hustle", "Silver Linings Playbook");
    var posterSix = new poster("darkknight_c","darkknight_u", "Inception", "The Prestige", "Batman Begins", "The Dark Knight");
    var posterSeven = new poster("fightclub_c","fightclub_u", "Pulp Fiction", "Seven", "Snatch", "Fight Club");

////////////////VARIABLES/////////////////
    var $next = $("#next-button");
    var $answers = $(".answers");
    var randomImage;
    var $img = $("#posterImg");

    //Keep Score starting with zero.
    var score;
    score= 0;

    //Empty and Used Arrays
    var unusedImages = [posterOne, posterTwo, posterThree, posterFour, posterFive, posterSix, posterSeven];
    var usedImages = [];

    function createAnswers() {
        var i, $update, answerText;
        for (i = 0; i < 4; i++) {
            $update = $(".answers p")[i];
            answerText = document.createTextNode(randomImage.randomAnswers[i]);

            //Set answers and then update nodes afterwards
            if (usedImages.length === 0) {
                $update.appendChild(answerText);
            }
            else {
                $update.childNodes[1].nodeValue = randomImage.randomAnswers[i];
            }
        }
    }


    function nextImage() {
        $next.hide();
        $(".answers p > span").removeClass();

        //Find Random Image Src from unusedImages Array
        (function() {
            var pullRandom = Math.floor(Math.random() * unusedImages.length);
            randomImage = unusedImages[pullRandom];
            return randomImage;
        }());

        //See if current image has already been used
        //Image has not been used, so make current image the new src and push it into the usedImages array
        if (usedImages.indexOf(randomImage) == -1) {
            $img.attr("src", "img/" + randomImage.censored + ".png").attr("alt", randomImage.correctAnswer);
            createAnswers();
            usedImages.push(randomImage);
        }
        else if (usedImages.length === unusedImages.length) {
            document.getElementById("next-button").textContent = "Play Again?";
        }
        //Image has been used, so find another random image
        else {
            nextImage();
        }
    }
    nextImage();


    function checkIfCorrect() {
        var $answerColor = $(this).children();
        var $guess = $(this).text().substring(1);
        if ($guess == randomImage.correctAnswer) {
            $answerColor.addClass("correct");
            score += 1;
            $('.add span').text(score);
        }
        else {
            $answerColor.addClass("wrong");
        }
        $next.show();
        $img.attr("src", "img/" + randomImage.uncensored + ".png").attr("alt", randomImage.correctAnswer);
        return score;
    }



    //**
   //Button
    //**

    //Check if answer is correct
    $(".answers p").on('click', checkIfCorrect);
    //Go to Next Image
    $next.on('click', nextImage);

});




// Fix the scoring system
