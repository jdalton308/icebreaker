'use strict';

var $ = require('jquery');
var TwoTruths = require('./two-truths.js');
var Data = require('./model-data.js');
var Util = require('./util.js');

var ScaleeData = Data.data;


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
var $body = $('body');
var $header = $('header');
var $slide1 = $('.slide1');

var $scaleeCont = $('.scalee-cont');
var $scalees = $scaleeCont.find('img');
var $infoSlide = $('.info-slide');
var $infoBg = $('.scalee-bio-background');
var $infoClose = $infoSlide.find('.close-btn');

// Fields to update
var $name = $infoSlide.find('.title-box h1');
var $bio = $infoSlide.find('.description-cont p');
var $postsLink = $infoSlide.find('#posts-link');
var $socialBtns = $infoSlide.find('.social-icon');
var $factItems = $infoSlide.find('.fact-item');



// State Vars
//---------------
var $scaleeInFocus;
var $newScalee;
var initialPos;
var initialHeight;
var isMobile = Util.isMobile();



// Bind Events
//----------------
function eventsOn() {
  // Click on scalee: Open Bio -----
  $scalees.click(clickHandler);
}
function mobileEventsOn() {
  $scalees.click(mobileClickHandler);
}



// Main Click Logic
//------------------------
function clickHandler() {
  $scaleeInFocus = $(this);
  var scaleeId = $scaleeInFocus.attr('id');

  // - Fill bio data
  fillBio(scaleeId);

  if (isMobile) {
    mobileScaleeCopy();
  } else {
    desktopAnimation();
  }

  // - show info slide with bio and left-side overlay
  $infoSlide.addClass('show');
  $infoBg.addClass('show');

  // - scroll to top then lock scroll
  TweenMax.to(window, 1, {scrollTo:'#meet'});
  $body.addClass('fixed');

}

function desktopAnimation() {
  // - copy scalee and set position on top of old one
  $newScalee = copyScalee($scaleeInFocus);
  $slide1.append($newScalee);

  // - then hide old scalee
  $scaleeCont.addClass('focus-mode');
  $scaleeInFocus.addClass('invisible');

  // - animate newScalee into position
  var targetLeft = 0.1;
  var windowWidth = window.innerWidth;
  var newLeftPos = windowWidth * targetLeft;

  TweenMax.to($newScalee, 0.4, {left:'25%', x:'-50%', top:50, height:(initialHeight*3)} );
}

// Function to place a new scalee right on top of the clicked scalee
function copyScalee($el) {

  var $newEl = $el.clone().removeClass('show').addClass('bio-scalee');

  var elPos = {
    top: $el.position().top,
    left: $el.offset().left
  };

  // Calculate top position in element
  var scaleeContTop = $scaleeCont.position().top;
  elPos.top += scaleeContTop;

  // Tweaks...
  elPos.top += 7; // not sure why the extra px are necessary
  elPos.left += 5;
  initialHeight = $el.height();

  $newEl.css({
    height: initialHeight,
    top: elPos.top,
    left: elPos.left
  });

  // Remember the initial placement
  initialPos = elPos;

  return $newEl;
}

function mobileScaleeCopy() {
  // - copy the clicked img src
  var imgSrc = $scaleeInFocus.attr('src');

  // - insert new img into .info-card with new imgSrc
  var prevImg = $infoSlide.children('img');
  if ( prevImg.length ) {
    prevImg.attr('src', imgSrc);
  } else {
    var $newImg = $('<img src="'+ imgSrc +'" class="new-img">');
    $infoSlide.prepend( $newImg );
  }
}


// Close Bio and Return Scalee
//------------------------------
function closeBio(){
  if (isMobile) {
    // - hide .info-slide
    $infoSlide.removeClass('show');

    // - let body scroll again
    $body.removeClass('fixed');

  } else {
    // - move newScalee to original position
    TweenMax.to($newScalee, 0.4, {
        left:initialPos.left,
        top:initialPos.top,
        height:initialHeight
      } );
    $newScalee.addClass('fly-away');

    // - remove scalee and reset view
    window.setTimeout(function(){
      $scaleeInFocus.removeClass('invisible');
      $newScalee.remove();
      $scaleeCont.removeClass('focus-mode');
    }, 800);

    // - and hide info slide
    $infoSlide.removeClass('show');
    $infoBg.removeClass('show');

    // - if not sorting, let page scroll again
    if ( !$slide1.hasClass('edit-mode') ) {
      $body.removeClass('fixed');
    } 
  }

  // Either way, close the two-truths game
  TwoTruths.endGame();

}


// Fill Bio Data
//------------------
function fillBio(scaleeId) {
  // - get scalee obj
  var scaleeData = Data.getScalee(scaleeId);

  updateText(scaleeData);
  updateLinks(scaleeData);
  updateGame(scaleeData);
}

function updateText(scaleeData) {
  // Update text: Name, bio
  $name.text(scaleeData.name);
  $bio.text(scaleeData.bio);

}
function updateLinks(scaleeData) {
  // - hide all links, then show if given for scalee
  $socialBtns.addClass('hide');
  $postsLink.addClass('hide');

  for (var link in scaleeData.links) {
    var url = scaleeData.links[link];
    var $btn = (link === 'posts') ? $postsLink : $socialBtns.filter('.icon-'+ link);

    $btn.attr('href', url).removeClass('hide');
  }
}
function updateGame(scaleeData) {
  // - remove 'lie' and 'truth' classes
  $factItems.removeClass('truth lie');

  // - get random number for lie. Fill in lie, then fill in truths
  var lieIndex = Math.floor( Math.random() * 2 ); // either 0, 1, or 2
  var $lieItem = $factItems.eq(lieIndex);
  $lieItem.addClass('lie').find('p').text( scaleeData.twoTruths.lie[0] );

  var $truthItems = $factItems.not('.lie');
  $truthItems.addClass('truth').each(function(i){
    $(this).find('p').text( scaleeData.twoTruths.truths[i] );
  });
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
module.exports.clickHandler = clickHandler;