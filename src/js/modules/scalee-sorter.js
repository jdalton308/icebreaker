'use strict';

var $ = require('jquery');

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
var $wheelSelectors = $('.wheel-selector');
var $filterItems = $wheelSelectors.children('.item');
var $sortTrigger = $('#sort-me');
var $scalees = $('.scalee-cont img');
var $infoSlide = $('.info-slide');
var $infoClose = $infoSlide.find('.close-btn');

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
}

// function wheelSelector() {

//   function centerList($wheelSelector) {
//     var itemCount = $wheelSelector.children('.item').length;
//     var listHeight = itemHeight * listHeight;
//     var hiddenArea = listHeight - wheelHeight;

//     console.log('List height: '+ listHeight);

//     if (hiddenArea > 0) {
//       var topPos = hiddenArea/2;
//       $wheelSelector.style('top', topPos);
//     }
//   }

//   function initWheels() {
//     $wheelSelectors.each(function(){
//       var $this = $(this);
//       centerList($this);
//     });
//   }

//   initWheels();
// }


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

// Initialize sorter
//------------------
function init() {
  eventsOn();
  closePanel();
  sort();
}

//   return {
//     init: init,
//     closePanel: closePanel
//   };
// })();


module.exports = {
  init: init,
  closePanel: closePanel,
  sort: sort
};