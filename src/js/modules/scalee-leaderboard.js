
var $ = require('jquery');
var Data = require('./model-data.js');
var Util = require('./util.js');
var Sorter = require('./scalee-sorter.js');
var Builder = require('./scalee-build.js');

var LeaderData = Builder.leaderData;
var imgPath = '/img/';


// Elements
//------------
var $window = $(window);
var $body = $('body');
var $header = $('header');
var $slide1 = $('.slide1');

var $leaderTrigger = $('#leader-trigger');
var $leaderCont = $('.leader-cont');
var $leaderTitle = $leaderCont.find('.leaderboard-title h1');
var $leaderBoxes = $leaderCont.find('.position-box');
var $leaderboardControls = $('.container.leaderboard');
var $leaderBtnCont = $leaderboardControls.children('.leaderboard-buttons');
var $leaderClose = $leaderCont.find('.back-btn');




//--------------------------
// Initialize leaderboard: Make buttons, bind events
//-----------------------------
function initLeaderboard() {
  var $buttonTemplate = $('<button class="leader"></button>');

  // Create buttons for leaderboard switching
  for (var event in LeaderData) {
    var eventObj = LeaderData[event];
    var $newBtn = $buttonTemplate.clone().text( eventObj.name ).attr('data-leader-id', event);

    // Insert new btn
    $leaderBtnCont.append( $newBtn );

    // Closure for eventId
    function bindClick() {
      var eventId = event;

      // Bind click event to show leaderboard
      $newBtn.click(function(){
        switchLeaderboard( eventId, $(this) );
      });
    };

    bindClick();
  } // end for loop
}



// Switch between rankings
//----------------------------
function switchLeaderboard(eventName, $btn) {
	// Switch src attribute to those of the top 5 poeple's scalee

	var eventObj = LeaderData[eventName];
	var leaders = eventObj.leaders;

	function animateChange(id, position) {
		var personImgSrc = getScaleeSrc(id);
		var $targetImg = $leaderBoxes.filter('.box-'+ position).children('img');

		// - hide img, wait for transition, then switch img and show
		$targetImg.addClass('hide');

		window.setTimeout(function(){
			$targetImg.attr('src', personImgSrc).removeClass('hide');
		}, 400);
	}

	function getScaleeSrc(scaleeId) {
		var scaleeObj = Data.getScalee(scaleeId);

		return imgPath + scaleeObj.src;
	}


	// - loop through data, get img src attribute, then apply to 'leader-boxes'
	for (var position in leaders) {
		var personId = leaders[position];

		// - closure for setTimeout
		animateChange(personId, position);
	} // end for loop

	// Finally, switch title
	switchLeaderTitle(eventObj.name);

	// Show active state on btn
	$btn.addClass('active').siblings('.active').removeClass('active');
}

function switchLeaderTitle(newTitle) {
  // Animate title out of view
  $leaderTitle.addClass('fade');

  // Wait for animation, then change title and animate back in
  window.setTimeout(function(){
    $leaderTitle.text(newTitle).removeClass('fade');
  }, 600);
}


// Enter 'Leaderboard Mode'
//--------------------------
function showLeaderboard() {

  // - trigger click on first btn, just to show some people
  var $btn = $leaderBtnCont.children('.leader');
  $btn.eq(0).trigger('click');

  // - trigger most style changes through CSS
  $slide1.addClass('leader-mode');

  // - wait 0.5s, then show new buttons
  window.setTimeout(function(){
    $leaderboardControls.addClass('show');
  }, 500);

  // - reset filters and close sorting panel
  Sorter.reset();
  Sorter.closePanel();

  // - lock scroll
  $body.addClass('fixed');
}



// Exit 'Leaderboard Mode'
//----------------------------
function hideLeaderboard() {
  // Undo everything above
  $slide1.removeClass('leader-mode');
  $leaderboardControls.removeClass('show');
  $body.removeClass('fixed');
}



//-------------------
// Bind events
//------------
function eventsOn() {

  // Switch to Leaderboard-mode -----
  $leaderTrigger.click(function(){
    showLeaderboard();
  });

  // Exit Leaderboard mode -----
  $leaderClose.click(function(){
    hideLeaderboard();
  });

}


function init() {
	initLeaderboard();
	eventsOn();
}



module.exports.init = init;