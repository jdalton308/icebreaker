'use strict';

var $ = require('jquery');
var LeaderData = require('./leaderboard.js');


// ------------------------
// Scalee Sorter
// ------------------------

// Elements
//------------
var $window = $(window);
var $page = $('body');
var $header = $('header');
var $slide1 = $('.slide1');

var $openFilter = $('#open-filter');
var $filterControls = $('.container.selectors');
var $wheelSelectors = $filterControls.find('.wheel-selector');
var $filterItems = $wheelSelectors.children('.item');

var $sortTrigger = $('#sort-me');
var $scaleeCont = $('.scalee-cont');
var $scalees = $scaleeCont.find('img');
var $infoSlide = $('.info-slide');
var $infoClose = $infoSlide.find('.close-btn');

var $leaderTrigger = $('#leaders');
var $leaderCont = $('.leader-cont');
var $leaderTitle = $leaderCont.find('.leaderboard-title h1');
var $leaderBoxes = $leaderCont.children('.position-box');
var $leaderboardControls = $('.container.leaderboard');

var itemHeight = $filterItems.outerHeight();


// State Variables
//-----------------
var filters = [];
var panelOpen = $slide1.hasClass('edit-mode');
var $scaleeInFocus;


// Bind events
//------------
function eventsOn() {

  // Open/close filter panel -----
  $openFilter.click(function(){
    if (panelOpen) {
      // console.log('closing panel...');
      closePanel();
    } else {
      // console.log('opening panel...');
      openPanel();
    }

    panelOpen = !panelOpen;
  });


  // Select filters -----
  $filterItems.click(function(){
    $(this).toggleClass('selected').siblings().removeClass('selected');
  });


  // Sort button -----
  $sortTrigger.click(function(){
    // close panel
    closePanel();
    panelOpen = false;

    // Trigger sort
    sort();
  });


  // Focus on scalee -----
  $scalees.click(function(){
    $scaleeInFocus = $(this);

    // TODO: Populate 'bubble' with correct information

    // Copy the img src attribute into 'bubble'
    var imgSrc = $scaleeInFocus.attr('src');
    var $infoImg = $infoSlide.find('img');
    $infoImg.attr('src', imgSrc);

    // Move scalee to correct position // Didn't work very well
    // $scaleeInFocus.addClass('focus');

    // Slide-in the 'bubble' with the correct information
    $infoSlide.addClass('show');
  });


  // Hide scalee focus ------
  $infoClose.click(function(){
    // Reverse above actions
    $scaleeInFocus.removeClass('focus');
    $infoSlide.removeClass('show');
  });


  // Switch to Leaderboard-mode -----
  $leaderTrigger.click(function(){
    showLeaderboard();
  });
}


// Open Filter Bar
//------------
function openPanel() {
  $slide1.addClass('edit-mode');

  // Change height of 'wheel-selector'
  function openFilters() {
    var openHeight = itemHeight * 4; // arbitrary
    $wheelSelectors.css('height', openHeight+'px');
  }

  openFilters();
}


// Collapse Filter Bar
//---------------
function closePanel() {

  // Get and position selected items
  function getAndSlideSelection() {

    // Get selected elements
    var $selectedFilters = $('.selectors .selected');

    // reset filters
    filters = [];

    // For each selection, slide up, and save value
    $selectedFilters.each(function(){
      var $this = $(this);
      slideUpSelection($this);

      // Store value
      var filterValue = $this.text();
      filters.push(filterValue);
    });

    // Wait for animation, then remove scroll ability
    window.setTimeout(function(){
      $slide1.removeClass('edit-mode');
    }, 500);

  }


  // Move selected items to top
  function slideUpSelection($item) {
    // Get scrollTop() of selection
    // var scrollPos = $item.position().top;

    // Try getting index, multiplying height, then scrolling to that
    var itemIndex = $item.index();

    // console.log('---------');
    // console.log('Scrolling to number '+ itemIndex);

    var scrollAmt = itemIndex * (itemHeight + 3); // Not sure why need to add the extra 3 px

    // console.log('Scroll Amt: '+ scrollAmt);
    // console.log('top Pos: '+ scrollPos);

    // $item.parents('.wheel-selector').scrollTop(scrollAmt);
    $item.parents('.wheel-selector').animate({
      scrollTop: scrollAmt
    }, 300);
  }


  // Change height of 'wheel-selector' to only show one item
  function collapseFilters() {
    $wheelSelectors.css('height', itemHeight+'px');
    // console.log('=== Collapsed ====');
  }

  collapseFilters();
  getAndSlideSelection();

} // end closePanel();


// Sort Scalees
//---------------
function sort() {

  // console.log('Sorting for the filters:');
  // console.log(filters);

  // Loop through all scalees and see if 'data-tag' attributes match all filters
  $scalees.each(function(){
    var $this = $(this);
    $this.removeClass('hide show'); // reset each sort

    // Compare each filter to data-tags;
    var elTags = $this.attr('data-tags');
    filters.forEach(function(filter, i){
      if (elTags.indexOf(filter) == -1) {
        // el does not have tag
        // if has all the tags, will never get here
        $this.addClass('hide');
      }
    });

    // If no 'hide' class, add 'show' class, for animation
    if ( !$this.hasClass('hide') ) {
      $this.addClass('show');
    }

  });


  // Todo: Create "nobody found" message
}


// Enter 'Leaderboard Mode'
//--------------------------
function showLeaderboard() {

  // Change colors
  $slide1.addClass('leader-mode');
  // - Hide scalees
  // - Show boxes for first five places
  // - Hide sorting selectors

  // Wait 0.5s, then show new buttons
  window.setTimeout(function(){
    $leaderboardControls.addClass('show');
  }, 500);

}
function hideLeaderboard() {
  // Undo everything above
  $slide1.removeClass('leader-mode');
  $leaderboardControls.removeClass('show');
}

function initLeaderboard() {
  var $buttonTemplate = $('<button class="leader"></button>');

  // Create buttons for leaderboard switching
  for (var event in LeaderData) {
    var eventObj = LeaderData[event];
    var $newBtn = $buttonTemplate.clone().text( eventObj.name ).attr('data-leader-id', event);

    // Insert new btn
    $leaderboardControls.append( $newBtn );

    // Closure for eventId
    function bindClick() {
      var eventId = event;

      // Bind click event to show leaderboard
      $newBtn.click(function(){
        // console.log('Switching leaderboard to '+ eventId);
        switchLeaderboard( eventId );
      });
    };

    bindClick();
  } // end for loop
}

function switchLeaderboard(eventName) {
  // Switch src attribute to those of the top 5 poeple's scalee

  var eventObj = LeaderData[eventName];
  var leaders = eventObj.leaders;

  // Loop through data, get img src attribute, then apply to 'leader-boxes'
  for (var position in leaders) {
    var personId = leaders[position];

    // Closure for setTimeout
    function animateChange() {
      var personImgSrc = getScaleeSrc(personId);
      var $targetImg = $leaderBoxes.eq( position-1 ).children('img');
      
      // Hide, then wait for transition, then switch img and show
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
  $leaderTitle.text(eventObj.name);
}


// Initialize sorter
//------------------
function init() {
  eventsOn();
  closePanel();
  sort();
  initLeaderboard();
}



module.exports = {
  init: init,
  closePanel: closePanel,
  sort: sort,
  closeLeaders: hideLeaderboard
};