'use strict';

var $ = require('jquery');
var LeaderData = require('./leaderboard.js');
var ScrollNav = require('./scroll-nav.js');


// ------------------------
// Scalee Bios
// ------------------------
// Order of actions:
// 1/ Click scalee
// 2/ Copy scalee element
// 3/ Position new scalee over old scalee
// 4/ Opacity = 0 for old scalee
// 5/ Move new scalee across screen to the desired location
// 6/ Slide in the page with bio


// Elements
//------------
var $window = $(window);
var $page = $('body');
var $header = $('header');
var $slide1 = $('.slide1');

var $scaleeCont = $('.scalee-cont');
var $scalees = $scaleeCont.find('img');
var $infoSlide = $('.info-slide');
var $infoBg = $('.scalee-bio-background');
var $infoClose = $infoSlide.find('.close-btn');


// State Vars
//---------------
var $scaleeInFocus;
var $newScalee;
var initialPos;


// Bind Events
//----------------
function eventsOn() {

  // Click on scalee: Open Bio -----
  $scalees.click(clickHandler);
}

// Unbind Events
//-----------------
function eventsOff() {
  $scalees.off('click');
}

// Main Click Logic
//------------------------
function clickHandler() {
  $scaleeInFocus = $(this);

  var scaleePos = $scaleeInFocus.position();

  // - copy scalee and set position on top of old one
  $newScalee = copyScalee($scaleeInFocus);
  $slide1.append($newScalee);
  // $newScalee.css({
  //   top: 0,
  //   left: (scaleePos.left + 5) // not sure why offset is off by 5px
  // });

  // - then hide old scalee
  $scaleeCont.addClass('focus-mode');
  $scaleeInFocus.addClass('invisible');

  // - animate newScalee into position
  var targetLeft = 0.25;
  var windowWidth = window.innerWidth;
  var newLeftPos = windowWidth * targetLeft;

  $newScalee.animate({
    left: newLeftPos
  }, 300);

  // - show info slide with bio and left-side overlay
  $infoSlide.addClass('show');
  $infoBg.addClass('show');

  // - finally, disable scalee click events while open


  function copyScalee($el) {
    var $newEl = $el.clone().removeClass('show').addClass('bio-scalee');
    var elPos = $el.offset();
    $newEl.css({
      height: $el.height(),
      top: elPos.top,
      left: elPos.left
    });

    // Remember the initial placement
    initialPos = elPos;

    return $newEl;
  }


  // TODO: Bind closing actions
  // TODO: Prevent click of two people
}


// Close Bio and Return Scalee
//------------------------------
function closeBio(){
    // - move newScalee to original position
    $newScalee.animate({
      left: initialPos.left
    }, 400).addClass('fly-away');
    // - remove scalee and reset view
    window.setTimeout(function(){
      $scaleeInFocus.removeClass('invisible');
      $newScalee.remove();
      $scaleeCont.removeClass('focus-mode');
    }, 800);

    // - and hide info slide
    $infoSlide.removeClass('show');
    $infoBg.removeClass('show');
  }


// General init
//------------------
function init() {
  // Close Bio Btn ------
  $infoClose.click(closeBio);
}


// Exports
//-------------
module.exports.init = init;
module.exports.on = eventsOn;
module.exports.off = eventsOff;