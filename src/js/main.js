
$(function(){


  // ---------------------
  // 'Global' variables
  //----------------------
  var $window = $(window);
  var $page = $('body');
  var $header = $('header');


  // ----------------
  // Utilities 
  // ----------------
  // Check if screen size is < iPad width
  function isMobile() {
    return window.innerWidth < 768;
  }


  //---------------------------
  // Scroll Navigation
  //---------------------------

  var scrollNavigation = (function() {

    var $dotNav = $('.dots-nav');
    var $dots = $dotNav.children('.dot');
    var $slides = $('.slide');
    var onMobile = isMobile();

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

          // Close the sorting panel
          scaleeSorter.closePanel();
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
    function init() {
      eventsOn();
    }

    // init();
    return {
      init: init
    };
  })();

  scrollNavigation.init();



  // ------------------------
  // Scalee Sorter
  // ------------------------
  var scaleeSorter = (function(){

    // Elements
    //------------
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

    return {
      init: init,
      closePanel: closePanel
    };
  })();

  scaleeSorter.init();


});