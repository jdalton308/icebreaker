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
var slideTimeout = 800;


// Events On/Off functions
//-------------------------
function eventsOn() {
  // $page.addClass('fixed');
  console.log('turning events on');

  $window.on({
    'DOMMouseScroll mousewheel': wheelHandler,
    keydown: keyHandler,
    touchstart: touchHandler
  });
  $dots.click(handleDotClick);
}

function eventsOff() {
  console.log('turning events off');

  $window.off({
    'DOMMouseScroll mousewheel': wheelHandler,
    keydown: keyHandler,
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


// Allow natural scrolling on last slide
//------------------------------------------
function allowScrolling() {
  // If on last slide...
  // - turn off events
  // - watch scroll position of last slide for top
  // - if at top, move to previous slide

  var $lastSlide = $slides.filter('.slide3');
  var lastScrollPos = null;

  function watchScrollHandler(ev) {
    var topPos = $lastSlide.scrollTop();    
    console.log('TopPos: '+ topPos);

    // If topPos == 0, and going up, go back to previous slide and turn events on
    if (!topPos && topPos < lastScrollPos) {
      eventsOn();
      prevSlide();
      turnOffScrollWatch();
    } else {
      pauseScrollWatch();
      lastScrollPos = topPos;
    }

  }

  // On/off/pause functions
  function turnOffScrollWatch() {
    $window.off('DOMMouseScroll mousewheel', watchScrollHandler);
  }
  function turnOnScrollWatch() {
    $window.on('DOMMouseScroll mousewheel', watchScrollHandler);
  }

  function pauseScrollWatch() {
    // Turn off scroll watch, wait 100ms, turn back on
    turnOffScrollWatch();

    window.setTimeout(function(){
      turnOnScrollWatch();
    }, 500) // NOTE: Increase timeout to make less sensitive
  }

  // Turn events off
  eventsOff();

  // Bind watching function
  turnOnScrollWatch();
}


// Navigation functions
// - Prev slide, next slide, setSlide (for the dot nav)
// - On last slide (job postings), allow normal scroll until scrolling up when already at top
//-------------------------
function prevSlide() {

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

    // If moved to last slide, turn scroll-control off
    if (currentSlide == $slides.length) {
      allowScrolling();
    } else {
      // Wait for animation
      wait();
    }

  }
}
function setSlide(index) {
  // Close leaderboard and sorting panel if leaving scalee-sorter
  if (currentSlide == 1) {
    ScaleeSorter.closePanel();
    ScaleeSorter.closeLeaders();
  }

  var slideCount = $slides.length;

  // set 'active(2)' class on slides <= index
  for (var i = 0; i <= slideCount; i++) {
    var $target = (i == 0) ? $slides.eq(i) : $slides.eq( i-1 );
    var targetClass = (i == 1) ? 'active2' : 'active';

    // if over clicked index, then remove the class
    $target.toggleClass(targetClass, (i <= index));
  }

  // Set dots
  setDots(index);

  // If last slide, allow scrolling, else wait for animation
  if (index == slideCount) {
    allowScrolling();
  } else {
    wait();
  }

  // Remember state
  currentSlide = index;
}

function wait() {
  // allow for transition animation before sliding again
  eventsOff();
  window.setTimeout(function(){
    eventsOn();
  }, slideTimeout);
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