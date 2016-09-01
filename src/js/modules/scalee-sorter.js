'use strict';

var $ = require('jquery');
var LeaderData = require('./leaderboard-data.js');
var Util = require('./util.js');


// ------------------------
// Scalee Sorter
// ------------------------

// Elements
//------------
var $window = $(window);
var $page = $('body');
var $header = $('header');
var $slide1 = $('.slide1');

var $openFilter = $('.open-panel');
var $filterControls = $('.container.selectors');
var $wheelSelectors = $filterControls.find('.wheel-selector');
var $filterItems = $wheelSelectors.children('.item');

// var $sortTrigger = $('#sort-me');
var $scaleeCont = $('.scalee-cont');
var $scalees = $scaleeCont.find('img');
var $infoSlide = $('.info-slide');
var $infoClose = $infoSlide.find('.close-btn');
var $scaleeLeftBtn = $('.scalee-scroll.prev');
var $scaleeRightBtn = $('.scalee-scroll.next');

var $leaderTrigger = $('#leader-trigger');
var $leaderCont = $('.leader-cont');
var $leaderTitle = $leaderCont.find('.leaderboard-title h1');
var $leaderBoxes = $leaderCont.find('.position-box');
var $leaderboardControls = $('.container.leaderboard');
var $leaderBtnCont = $leaderboardControls.children('.leaderboard-buttons');
var $leaderClose = $leaderCont.find('.back-btn');

var itemHeight = $filterItems.outerHeight();


// State Variables
//-----------------
var filters = [];
var panelOpen = $slide1.hasClass('edit-mode');
var $scaleeInFocus;
var isMobile = Util.isMobile();


// Bind events
//------------
function eventsOn() {

  // Open/close filter panel -----
  $openFilter.click(function(){
    if (panelOpen) {
      closePanel();
    } else {
      openPanel();
    }

  });


  // Select filters -----
  $filterItems.click(function(){
    // Show selected state
    $(this).toggleClass('selected').siblings().removeClass('selected');

    // Trigger sorting
    sort();
  });


  // Switch to Leaderboard-mode -----
  $leaderTrigger.click(function(){
    showLeaderboard();
  });

  // Exit Leaderboard mode -----
  $leaderClose.click(function(){
    hideLeaderboard();
  });


  // Scroll scalees ------
  $scaleeLeftBtn.click(function(){
    scrollScalees(0.1);
  });
  $scaleeRightBtn.click(function(){
    scrollScalees(-0.1);
  });
}

// Open Filter Bar
//------------
function openPanel() {

  // - change height of 'wheel-selector'
  function openFilters() {
    var openHeight = itemHeight * 4; // arbitrary
    $wheelSelectors.css('height', openHeight+'px');
  }

  if (!isMobile) {
    // - turn off scroll-triggered nav when open
    // ScrollNav.eventsOff();
    openFilters();
  }

  // - change styles
  $slide1.addClass('edit-mode');

  // - save state
  panelOpen = true;

}


// Collapse Filter Bar
//---------------
// Change height of 'wheel-selector' to only show one item
function setClosedHeight() {
  $wheelSelectors.css('height', itemHeight+'px');
}

function closePanel() {

  function setFilterPos() {

    // - get selected elements
    var $selectedFilters = $wheelSelectors.find('.selected');

    // - for each selection, slide up, and save value
    $selectedFilters.each(function(){
      // - get index, multiplying height, then scrolling to that
      var $this = $(this);
      var itemIndex = $this.index();
      var scrollAmt = itemIndex * (itemHeight + 3); // Not sure why need to add the extra 3 px

      $this.parents('.wheel-selector').animate({
        scrollTop: scrollAmt
      }, 300);
    });

    // - wait for animation, then remove scroll ability
    window.setTimeout(function(){
      $slide1.removeClass('edit-mode');
    }, 500);

  }


  // On mobile, just remove the class and collapse control panel...
  if (isMobile) {
    $slide1.removeClass('edit-mode');

  // Else collapse the wheels and show the selected...
  } else {
    setClosedHeight();
    setFilterPos();

    // - turn back on scroll-triggered nav
    // ScrollNav.eventsOn();
  }

  // - save state
  panelOpen = false;

} // end closePanel();


// Sort Scalees
//---------------
function sort() {

  // 1. Get filters
  // - Get selected elements
  var $selectedFilters = $wheelSelectors.find('.selected');

  // - reset filters
  filters = [];

  // - For each selection, slide up, and save value
  $selectedFilters.each(function(){
    var $this = $(this);

    // - Store text value
    var filterValue = $this.text();
    filters.push(filterValue);
  });


  // 2. Loop through all scalees and see if 'data-tag' attributes match all filters
  $scalees.each(function(){
    var $this = $(this);
    $this.removeClass('hide show'); // reset each sort

    // - compare each filter to data-tags;
    var elTags = $this.attr('data-tags');
    filters.forEach(function(filter, i){
      if (elTags.indexOf(filter) == -1) {
        // if has all the tags, will never get here
        $this.addClass('hide');
      }
    });

    // - if no 'hide' class, add 'show' class, for animation
    if ( !$this.hasClass('hide') ) {
      $this.addClass('show');
    }

  });


  // 3. Center scalees
  centerScalees();


  // Todo: Create "nobody found" message
}
function resetFilters() {
  // Remove '.seleccted' tag
  $wheelSelectors.find('.selected').removeClass('selected');

  // Re-sort scalees
  sort();
}


// Enter 'Leaderboard Mode'
//--------------------------
function showLeaderboard() {

  // - trigger most changes through CSS
  $slide1.addClass('leader-mode');

  // - wait 0.5s, then show new buttons
  window.setTimeout(function(){
    $leaderboardControls.addClass('show');
  }, 500);

  // - reset filters and close sorting panel
  resetFilters();

  closePanel();
}

// Exit 'Leaderboard Mode'
//----------------------------
function hideLeaderboard() {
  // Undo everything above
  $slide1.removeClass('leader-mode');
  $leaderboardControls.removeClass('show');
}

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
        switchLeaderboard( eventId );
      });
    };

    bindClick();
  } // end for loop
}


// Switch between rankings
//----------------------------
function switchLeaderboard(eventName) {
  // Switch src attribute to those of the top 5 poeple's scalee

  var eventObj = LeaderData[eventName];
  var leaders = eventObj.leaders;

  // - loop through data, get img src attribute, then apply to 'leader-boxes'
  for (var position in leaders) {
    var personId = leaders[position];

    // - closure for setTimeout
    function animateChange() {
      var personImgSrc = getScaleeSrc(personId);
      var $targetImg = $leaderBoxes.eq( position-1 ).children('img');
      
      // - hide img, wait for transition, then switch img and show
      $targetImg.addClass('hide');

      window.setTimeout(function(){
        $targetImg.attr('src', personImgSrc).removeClass('hide');
      }, 300);
    }

    animateChange();
  } // end for loop

  function getScaleeSrc(scaleeId) {
    var $scalee = $scalees.filter('#'+scaleeId);
    return $scalee.attr('src');
  }

  // Finally, switch title
  switchLeaderTitle(eventObj.name);
}

function switchLeaderTitle(newTitle) {
  // Animate title out of view
  $leaderTitle.addClass('fade');

  // Wait for animation, then change title and animate back in
  window.setTimeout(function(){
    $leaderTitle.text(newTitle).removeClass('fade');
  }, 600);
}


// Scalee lateral scrolling
//-----------------------------
var scaleeOffset;

function centerScalees() {
  // Just reset the translateX CSS property to 50%;
  scaleeOffset = 0.5;
  setTranslate();
}

function scrollScalees(dist) {

  if ( (scaleeOffset >= 0.95 && dist > 0) || 
        (scaleeOffset <= 0.05 && dist < 0) ) {
    return;
  }

  scaleeOffset += dist;
  setTranslate()
}

function setTranslate() {
  var offsetString = (100 * scaleeOffset) + '%';

  $scaleeCont.css({
    transform: 'translateX(' + offsetString +')'
  });
}


// Initialize sorter
//------------------
function init() {
  eventsOn();
  closePanel();
  sort();
  initLeaderboard();
}


// Exports
//------------------
module.exports.init = init;
module.exports.closePanel = closePanel;
module.exports.sort = sort;
module.exports.closeLeaders = hideLeaderboard;
module.exports.center = centerScalees;
