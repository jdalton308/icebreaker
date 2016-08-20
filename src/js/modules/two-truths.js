'use strict';

var $ = require('jquery');
var ScaleeSorter = require('./scalee-sorter.js');


// ------------------------
// Scroll-Triggered Nav
// ------------------------

// Fake Data
//-------------
var questionData = {
	"person1": {
		"truths": [
			"I have flown acrobatic maneuvers in a small aircraft.",
			"My uncle Vincent created the font Comic Sans by tracing my handwriting from a Christmas card."
		],
		"lie": "I ranked first in an Air Training Corps rifle competition. The same week, I topped the world leaderboard for an online F.P.S."
	},
	"person2": {
		"truths": [
			"I won a medal in the summer X-Games.",
			"For my 18th birthday, my grandpa bought me a trip to see every continent."
		],
		"lie": "My first car was a 2007 Ferrari."
	}
}


// Elements
//------------
var $infoSlide = $('.info-slide');
var $contentCont = $infoSlide.find('.content-cont');
var $gameTrigger = $infoSlide.find('.truths');
var $gameCont = $contentCont.find('.game-cont');
var $facts = $gameCont.find('.fact-item');
var $closeBtn = $gameCont.find('.close-game-btn');

function bindEvents() {

	// Start game
	$gameTrigger.click(startGame);

	// Reveal answers
	$facts.click(function(){
		$gameCont.addClass('reveal');
	});

	// Back to bio
	$closeBtn.click(endGame);
}

function startGame() {
	// Show game-cont, hide description
	$contentCont.addClass('question-mode');
}

function setQuestions() {
	// For prototype, pick person at random...
	// Create three elements, bind click event, and insert in random order
}
function endGame() {
	console.log('ending game');
	$contentCont.removeClass('question-mode');

	window.setTimeout(function(){
		$gameCont.removeClass('reveal');
	}, 1000);
}

function initGame() {
	// Bind events
	bindEvents();

	// Populate and mix-up the questions

}

module.exports.init = initGame;
module.exports.endGame = endGame;