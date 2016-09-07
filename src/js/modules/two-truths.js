'use strict';

var $ = require('jquery');
var ScaleeSorter = require('./scalee-sorter.js');


// ------------------------
// Scroll-Triggered Nav
// ------------------------

// Fake Data
//-------------
// var questionData = {
// 	"person1": {
// 		"truths": [
// 			"I have flown acrobatic maneuvers in a small aircraft.",
// 			"My uncle Vincent created the font Comic Sans by tracing my handwriting from a Christmas card."
// 		],
// 		"lie": "I ranked first in an Air Training Corps rifle competition. The same week, I topped the world leaderboard for an online F.P.S."
// 	},
// 	"person2": {
// 		"truths": [
// 			"I won a medal in the summer X-Games.",
// 			"For my 18th birthday, my grandpa bought me a trip to see every continent."
// 		],
// 		"lie": "My first car was a 2007 Ferrari."
// 	}
// }


// Elements
//------------
var $infoSlide = $('.info-slide');
var $gameCont = $infoSlide.find('.game-cont');
var $gameTitle = $gameCont.find('.game-title');
var $facts = $gameCont.find('.fact-item');


// State variables
//------------------
var answered = 0;
var originalText = $gameTitle.text();


function bindEvents() {
	// Reveal answers
	$facts.click(checkQuestion);
}
function setQuestions() {
	// For prototype, pick person at random...
	// Create three elements, bind click event, and insert in random order
}
function checkQuestion() {
	var $fact = $(this);

	if ( $fact.hasClass('lie') ) {
		// incorrect guess, so mark all answers
		showAnswers($fact);
		$gameTitle.text("Oops, that's the lie.").addClass('red');
	} else {
		// correct
			// - check if first or second guess
		if (!answered) {
			$fact.addClass('reveal');
			answered++;
		} else {
			// - if second, show all answers
			showAnswers($fact);
			$gameTitle.text("Nice! You got them both.").addClass('green');
		}
	}
}
function showAnswers($fact) {
	return $facts.addClass('reveal');
}
function hideAnswers() {
	return $facts.removeClass('reveal');
}
function endGame() {
	// Reset state
	answered = 0;

	// - let transition occur, then reset formatting
	window.setTimeout(function(){
		hideAnswers();
		$gameTitle.text(originalText).removeClass('red green');
	}, 1000)
}


function initGame() {
	// Populate and mix-up the questions

	// Bind events
	bindEvents();
}


module.exports.init = initGame;
module.exports.endGame = endGame;