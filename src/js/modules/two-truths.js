'use strict';

var $ = require('jquery');


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
	// Bind events
	bindEvents();
}


module.exports.init = initGame;
module.exports.endGame = endGame;