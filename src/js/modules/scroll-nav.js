'use strict';

var $ = require('jquery');
var ScaleeSorter = require('./scalee-sorter.js');


// ------------------------
// Scroll-Triggered Nav
// ------------------------

// Elements
//------------
var $window = $(window);
var $page = $('body');
var $header = $('header');

var $dotNav = $('.dots-nav');
var $dots = $dotNav.children('.dot');
var $slides = $('.slide');
// var onMobile = isMobile();

var currentSlide = 0;
var slideNum = $slides.length + 1; // Add 1 for first movement
var slideTimeout = 1000;


// Events On/Off functions
//-------------------------
function eventsOn() {
  $page.addClass('fixed');

  $window.on({
    'DOMMouseScroll mousewheel': wheelHandler,
    keydown: keyHandler,
    // resize: resizeHandler
    touchstart: touchHandler
  });
  $dots.click(handleDotClick);
}


function eventsOff() {
  $window.off({
    'DOMMouseScroll mousewheel': wheelHandler,
    keydown: keyHandler,
    // resize: resizeHandler
    touchstart: touchHandler
  });
  $dots.off({click: handleDotClick});
}


// Event Handlers
// - Scroll, touch, nav, and arrow-keys
//----------------------
function wheelHandler(ev) {
  var delta = (ev.type == 'DOMMouseScroll' ? // Mozilla calculates scroll differently, with this event
      ev.originalEvent.detail * -40 :
      ev.originalEvent.wheelDelta);

  var up = delta > 20;
  var down = delta < -20;

  var prevent = function() {
    ev.stopPropagation();
    ev.preventDefault();
    ev.returnValue = false;
    return false;
  }

  if (up) {
    prevSlide();
  } else if (down) {
    nextSlide();
  }

  return prevent();
}


function handleDotClick(ev) {
  var index = $dots.index(this);

  setSlide(index);
}


function touchHandler(ev) {
  ev.preventDefault();
  // watch for direction of touchmove event after touchdown.  If up, prevSlide(), if down, nextSlide()
  var event = ev.originalEvent.changedTouches[0];
  var startX = event.clientX;
  var startY = event.clientY;

  $featureEl.on({
    touchmove: touchMoveHandler,
    touchend: touchEndHandler
  });

  function touchMoveHandler(ev) {
    ev.preventDefault(); // only using preventDefault() here to allow click() event to occur on dots
  }
  function touchEndHandler(ev) {
    ev.preventDefault();
    var event = ev.originalEvent.changedTouches[0];
    var newX = event.clientX;
    var newY = event.clientY;

    var deltaY = newY - startY;
    var up = (deltaY > 50);
    var down = (deltaY < -50);

    if (up) {
      prevSlide();
    } else if (down) {
      nextSlide();
    }


    $featureEl.off({
      touchmove: touchMoveHandler,
      touchend: touchEndHandler
    });
  }
}


function keyHandler(ev) {
  // if up or left arrow...
  if (ev.keyCode === 37 || ev.keyCode === 38) {
    prevSlide();

  // or if down or right arrow...
  } else if (ev.keyCode === 39 || ev.keyCode === 40) {
    nextSlide();
  }
}


// Navigation functions
// - Prev slide, next slide
//-------------------------
function prevSlide() {
  // setSlide(currentSlide-1);

  // remove 'active' class from current slide
  if (currentSlide) { // ensure not 0, If 0, do nothing

    if (currentSlide == 1) { // change state on first slide
      var $target = $slides.eq(0);
      var removedClass = 'active2';

      // Close the sorting panel, and leaderboard panel
      ScaleeSorter.closePanel();
      ScaleeSorter.closeLeaders();
    } else {
      var $target = $slides.eq(currentSlide-1);
      var removedClass = 'active';
    }

    // Remove 'active'
    $target.removeClass(removedClass);

    // Set other states
    currentSlide--;
    setDots(currentSlide);

    // Wait for animation
    wait();
  }
}

function nextSlide() {
  // setSlide(currentSlide+1);

  // Add 'active' class to next slide
  if (currentSlide !== $slides.length) { // ensure not last slide. If so, do nothing
    
    var $target = $slides.eq(currentSlide);

    // If currentSlide == 0, add 'active2' class
    var addedClass = (currentSlide) ? 'active' : 'active2';

    // Add 'active'
    $target.addClass(addedClass);

    if (currentSlide == 1) {
      // Close leaderboard and sorting panel
      ScaleeSorter.closePanel();
      ScaleeSorter.closeLeaders();
    }

    // Remember state
    currentSlide++;
    setDots(currentSlide);

    // Wait for animation
    wait();
  }
}

function wait() {
  // allow for transition animation before sliding again
  eventsOff();
  window.setTimeout(function(){
    eventsOn();
  }, slideTimeout+200);
}

function setDots(num) {
  var $targetDot = $dots.eq(num);
  $targetDot.addClass('current').siblings().removeClass('current');
}


// Initailize
//--------------
function init() {
  eventsOn();
}


module.exports = init;