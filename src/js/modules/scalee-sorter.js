// 'use strict';

var $ = require('jquery');
var ScaleeBuilder = require('./scalee-build.js');
var Util = require('./util.js');
var ScaleeScrolling = require('./scalee-scrolling.js');

// var ScaleeData = Data.rawData;
var TagData = ScaleeBuilder.tagData;
// var LeaderData = Data.leaderData;


// ------------------------
// Scalee Sorter
// ------------------------

// Elements
//------------
var $window = $(window);
var $body = $('body');
var $header = $('header');
var $slide1 = $('.slide1');

var $suLogo = $slide1.find('.su-logo');
var $trimLogo = $slide1.find('.trimble-logo');
var $sefLogo = $slide1.find('.sefaira-logo');

var $openFilter = $('.open-panel');
var $wheelContainers = $('.selector');
var $wheelSelectors = $wheelContainers.find('.wheel-selector');
var $filterItems = $wheelSelectors.children('.item');

var $scaleeCont = $('.scalee-cont');
var $scalees = $scaleeCont.find('img');
var $nullScalee = $scalees.filter('#null-person');

var $infoSlide = $('.info-slide');
var $infoClose = $infoSlide.find('.close-btn');


// State Variables
//-----------------
var filters = [];
var panelOpen = $slide1.hasClass('edit-mode');
var isMobile = Util.isMobile();

var logos = {
  sketchup: $suLogo,
  trimble: $trimLogo,
  sefaira: $sefLogo
};


//-----------------------------
// Build sorter from data
//------------------------
function buildSorterWheels(){
  for (var category in TagData) {
    var $wheelCont = $wheelContainers.filter('.'+ category);
    var $wheel = $wheelCont.find('.wheel-selector');

    // - Create new items
    var tagArray = TagData[category];
    var $itemTemplate = $('<div class="item"></div>');
    tagArray.forEach(function(tag, i) {
      var $newItem = $itemTemplate.clone().text(tag);
      $wheel.prepend($newItem);
    });
  }

  // Update variables
  $filterItems = $wheelSelectors.children('.item');
}



//-------------------
// Open/Close the Sorting Wheels Bar
//------------
function openPanel() {
  // - scroll to position
  TweenMax.to(window, 0.7, {scrollTo:'#meet'});

  // - change styles and lock scroll
  $slide1.addClass('edit-mode');
  $body.addClass('fixed');

  // - save state
  panelOpen = true;
}

function closePanel() {
  $slide1.removeClass('edit-mode');
  $body.removeClass('fixed');
  panelOpen = false;
}

function handlePanelOpen() {
  if (panelOpen) {
    closePanel();
  } else {
    openPanel();
  }
}


//-----------------
// Sort Scalees
//---------------
function handleFilterClick() {
  var $this = $(this);

  // - Show selected state
  showSelectedState($this);

  // - Update filters array
  updateFilters($this);

  // Trigger sorting
  sort();
}

function showSelectedState($item) {
  $item.toggleClass('selected').siblings('.selected').removeClass('selected');
  setPointer($item);
}

function updateFilters($item) {
  var newFilter = $item.text();
  var filterIndex = filters.indexOf(newFilter);

  // - If in array, remove, else...
    // check what category this is,
    // if another item from that category is preset, remove it

  if (filterIndex != -1) {
    filters.splice(filterIndex, 1);
  } else {
    // - Check if another filter is in same category. If yes, remove
      // - but only if anything else is even present
    if (filters.length) {
      var thisCategory = getFilterCategory(newFilter);
      for (var i = 0; i < filters.length; i++) {
        var otherCategory = getFilterCategory(filters[i]);
        if (thisCategory === otherCategory) {
          // if filter in same category found, remove...
          filters.splice(i, 1);
          break;
        }
      }
    }
  
    // Add new filter
    filters.push(newFilter);
  }

  console.log('filters: %o', filters);
}

function getFilterCategory(filter) {
  var theCategory;

  for (var category in TagData) {
    var catArray = TagData[category];
    
    for (var i = 0; i < catArray.length; i++) {
      if ( filter === catArray[i] ) {
        theCategory = category;
        break;
      }
    }
  }

  return theCategory;
}


function sort() {

  // - Hide all logos, then show correct ones after scalees are sorted
  hideLogos();

  // - Loop through all scalees and see if 'data-tag' attributes match all filters
  hideFilteredScalees();

  // - Center scalees
  ScaleeScrolling.center();
}


function hideFilteredScalees() {
  // - reset null state
  var areScalees = false;

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

    // - if no 'hide' class, add 'show' class, for animation, and set null-state var
    if ( !$this.hasClass('hide') ) {
      $this.addClass('show');
      areScalees = true; // prevent null scalee
      showLogo($this); // show attached logo
    }

  });

  // - if no scalees, show null dude
  if (!areScalees) {
    $nullScalee.removeClass('hide').addClass('show');
  }
}

function resetFilters() {
  // Remove '.seleccted' tag and reset array
  $wheelSelectors.find('.selected').removeClass('selected');

  filters = [];

  // Re-sort scalees
  sort();
}

// Set pointer position on wheel
//--------------------------------
function setPointer($el, showing) {
  var $parentWheel = $el.closest('.wheel-selector');
  var $wheelPointer = $el.siblings('.pointer');
  var elOffset = $el.position();

  // if (isMobile) {
  //   var elWidth = $el.innerWidth();
  //   var wheelScroll = $parentWheel.scrollLeft();

  //   var newLeft = elOffset.left + (elWidth/2) + wheelScroll;
  //   $wheelPointer.css('left', newLeft);

  // } else {
    var elHeight = $el.innerHeight();
    var wheelScroll = $parentWheel.scrollTop();

    var newTop = elOffset.top + (elHeight/2) + wheelScroll;
    $wheelPointer.css('top', newTop);
  // }

  $wheelPointer.toggleClass('show', $el.hasClass('selected') );
}

// Toggle logos in Background
//----------------------------
function hideLogos() {
  for (var logo in logos) {
    var logoEl = logos[logo];
    logoEl.addClass('hide');
  }
}
function showLogo($el) {
  var team = $el.attr('data-logo');

  if (team) {
    logos[team].removeClass('hide');
  }
}



//-------------------
// Bind events
//------------
function eventsOn() {

  // Open/close filter panel -----
  $openFilter.click(handlePanelOpen);

  // Select filter items -----
  $filterItems.click(handleFilterClick);

}



//--------------------
// Initialize sorter
//------------------
function init() {
  buildSorterWheels();
  closePanel();
  sort();
  eventsOn();
}



// Exports
//------------------
module.exports.init = init;
module.exports.closePanel = closePanel;
module.exports.sort = sort;
module.exports.reset = resetFilters;
