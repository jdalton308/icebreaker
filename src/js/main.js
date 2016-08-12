
$(function(){

  var $scene1 = $('.scene1');

  $('#open-filter').click(function(){
  	$scene1.toggleClass('edit-mode');
  });


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

  function scrollNavigation() {

    // var $featureEl = $('#section-home-featured');
    // var featureHeight = $featureEl.height();
    var $dotNav = $('.dots-nav');
    var $dots = $dotNav.children('.dot');
    var $slides = $('.slide');
    // var headerHeight = $header.height();
    // var $scrollArrow = $featureEl.find('.icon-arrow-down');
    var onMobile = isMobile();



    // function checkBgHeight() {
    //   // bg image dimensions are 2000x4000

    //   var imgWidth = 2000;
    //   var imgHeight = 4000;
    //   var imgWHratio = imgWidth/imgHeight;

    //   var windowWidth = window.innerWidth;
    //   var windowHeight = window.innerHeight;
    //   var halfWindowRatio = windowWidth/(windowHeight*2);
    //   var isTall = (halfWindowRatio < imgWHratio);

    //   var tallBgStyle = {
    //     'backgroundSize': 'auto 200%'
    //   };
    //   var wideBgStyle = {
    //     'backgroundSize': '100% auto'
    //   };

    //   $featureEl.css((isTall) ? tallBgStyle : wideBgStyle);

    //   return;
    // }


    function bindScrollWatch() {
      var scrollTopPos = $page.scrollTop();

      var currentSlide = 0;
      var slideNum = $slides.length + 1; // Add 1 for first movement
      var slideTimeout = 1000;

      console.log('Slide number: '+ slideNum);

      // Ensure not already past the feature section
      // if (scrollTopPos > 0) {
      //   passedSlides();
      //   watchForTop();
      //   return;
      // }

      eventsOn();
      // $scrollArrow.click(function(){
      //   setSlide(slideNum);
      // });


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


      // function resizeHandler(ev) {
      //   featureHeight = $featureEl.height();
      //   headerHeight = $header.height();
      //   checkBgHeight();
      // }


      function prevSlide() {
        setSlide(currentSlide-1);
      }

      function nextSlide() {
        setSlide(currentSlide+1);
      }


      function setSlide(num) {

        console.log('Setting slide: '+ num);
        console.log('SlideNum: '+ slideNum);

        // If at last slide, or at the top, do nothing
        if (num == slideNum || num < 0) {
          return;
        }

        // Set slide through scene index
        // - If num == 1, change state of first slide
        // - If num > 1, actual scene index is num - 1

        if (num == 1) {
          // Hide text on slide1, and show control panel
          var $target = $slides.eq(0);
          $target.addClass('active2'); // Arbitrary class to trigger state change

          // If going backwards
          var $prevTarget = $slides.eq(1);
          $prevTarget.removeClass('active');

        } else {
          // Next slide
          var actualSlide = num - 1;

          // If going forwards
          var $target = $slides.eq(actualSlide);
          $target.addClass('active');

          // If going backwards
          var $prevTarget = $slides.eq(num);
          $prevTarget.removeClass('active');
        }

        // Set dot nav state
        setDots(num);

        // Remember slide
        currentSlide = num;

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


      // function watchForTop() {
      //   $window.on('scroll', function(){
      //     var scrollTop = $window.scrollTop();

      //     if (scrollTop === 0) {
      //       $page.addClass('fixed');

      //       window.setTimeout(function(){
      //         $window.off('scroll');
      //         eventsOn();
      //       }, slideTimeout/2);
      //     }
      //   });
      // }


      // function passedSlides() {
      //   if (scrollTopPos < featureHeight) {
      //     $page.animate({
      //       scrollTop: featureHeight - headerHeight
      //     }, slideTimeout/2);
      //   }

      //   currentSlide = slideNum - 1;
      //   $featureEl.attr('class', 'current-'+ currentSlide);
      //   setDots(currentSlide);
      //   $header.addClass('white');
      //   return;
      // }


    } // end bindScrollWatch()

    function init() {
      bindScrollWatch();
    }

    init();
  };

  // if (pageID === 'home')
  scrollNavigation();



});