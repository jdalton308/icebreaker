'use strict';

var $ = require('jquery');

// NOTE: All GSAP and Scrollmagic dependencies do not work with Browserify, so they have their own gulp task, and are loaded on the page in their own file


// -------------------------------
// Scroll-controlled Animations
// -------------------------------

function scrollAnimate() {

	// If need to adjust scroll sensitivity:
	//-----------------------------------------
	// function wheel(event) {
	// 	var delta = 0;
	// 	if (event.wheelDelta) {
	// 		(delta = event.wheelDelta / 120);
	// 	} else if (event.detail) {
	// 		(delta = -event.detail / 3);
	// 	}

	// 	handle(delta);
	// 	if (event.preventDefault) {
	// 		(event.preventDefault());
	// 	}
	// 	event.returnValue = false;
	// }

	// function handle(delta) {
	// 	var time = 100;
	// 	var distance = 500;

	// 	$('html, body').stop().animate({
	// 		scrollTop: $(window).scrollTop() - (distance * delta)
	// 	}, time );
	// }

	// if (window.addEventListener) {window.addEventListener('DOMMouseScroll', wheel, false);}
	// window.onmousewheel = document.onmousewheel = wheel;



	// Init Scroll Magic controller
	var controller = new ScrollMagic.Controller();


	//------------------
	// Scalee Sorter
	//-----------------------
	// - Adjust background height
	// - Adjust scalee-cont size

	var $slide2 = $('.slide1');
	var slide2_el = $slide2.get(0);
	var $scaleeBg = $('.scalee-background');
	var scalee_bgel = $scaleeBg.get(0);
	var scaleeCont_el = $slide2.find('.scalee-cont').get(0);

	// Toggle active class
	//----------------------
	var scaleeClassScene = new ScrollMagic.Scene({
			triggerElement: slide2_el,
			triggerHook: '0.15'
		})
		.setClassToggle(slide2_el, 'active')
		.addTo(controller);

	// Adjust background height
	//--------------------------
	var sorter_tween = TweenMax.to(scalee_bgel, 1, {height:'40%'});

	var scaleeScene = new ScrollMagic.Scene({
			triggerElement: slide2_el,
			triggerHook: '0.5',
			duration: '100%'
		})
		.setTween(sorter_tween)
		.addTo(controller);


	//-----------------------
	// Small airplane-like polygon in forefront
	//--------------------------
	var slide1 = $('.slide0').get(0);
	var landingPoly = document.getElementById('landing-poly');

	var smallPoly_tl = new TimelineMax();
		smallPoly_tl.to(landingPoly, 1, {right:'100%', top:'-20%', scale:0.7, rotation:'80deg', zIndex:0});
		smallPoly_tl.to(landingPoly, 3, {right:'60%', top:'-5%', scale:0.5, rotation:'130deg'});
	// var title1_poly = TweenMax.to(landingPoly, 1, {right:'90%', top:'50%', scale: 0.7, rotation:'80deg'});

	var landingPolyScene = new ScrollMagic.Scene({
			triggerElement: slide1,
			triggerHook: 'onLeave',
			duration: '500%'
		})
		.setTween(smallPoly_tl)
		.addTo(controller);


	//------------------
	// Large polygon in background
	//-----------------------
	// - Fix to window and rotate during scroll

	var largePoly_el = $('#large-poly')[0];
	var poly_tl = new TimelineMax();
		poly_tl.to(largePoly_el, 1, {rotation:'15deg', top:'-5%', left:'-50%'});
		poly_tl.to(largePoly_el, 3, {rotation:'30deg', top:'0%', left:'-40%', scale:1.2});

	var polyScene = new ScrollMagic.Scene({
			triggerElement: slide2_el,
			triggerHook: '1',
			duration: '500%' // last entire page
		})
		.setTween(poly_tl)
		.addTo(controller);



	//------------------
	// Title-boxes
	//-----------------------

	// Constructor function
	function newTitleBoxScene($titleBox) {
		// Summary:
		// - Blur in the text
		// - Move text in parallax-type way, with the underline being the reference
		// - Number is most forward, and moves slowest, then text, then underline

		// - text blur/focus objects
		var textFocusObj = {
			color: 'rgba(54, 53, 69, 1)',
			textShadow: '0px 0px 0px rgba(0,0,0,0)',
			top: 0
		};
		var textBlurObj = {
			color: 'rgba(54, 53, 69, 0)',
			textShadow: '0 0 15px rgba(54, 53, 69, 1)',
			top: '100px'
		}

		// - define elements
		var title_el = $titleBox.get(0);
		var title_num = $titleBox.find('.slide-number').get(0);
		var title_h1 = $titleBox.find('h1').get(0);
		var title_line = $titleBox.find('.underline').get(0);
		var title_h2 = $titleBox.find('h2').get(0);

		var in_duration = 1;
		var in_delay = 0;
		var out_delay = in_duration + in_delay;
		var out_duration = 1;

		// - create timeline
		var newTitle_tl = new TimelineMax();
			// - animations in
			// newTitle_tl.to(title_el, in_duration, {top: 0}, in_delay);
			newTitle_tl.to(title_num, in_duration, {top: 0}, in_delay);
			newTitle_tl.to(title_h1, in_duration, textFocusObj, in_delay);
			// newTitle_tl.to(title_line, in_duration, {top: 0}, in_delay);
			newTitle_tl.to(title_h2, in_duration, textFocusObj, in_delay);
			// - animations out
			// newTitle_tl.to(title_el, title_out_dur, {top: '150px'}, (in_duration+in_delay));
			newTitle_tl.to(title_num, out_duration, {top:'-100px'}, out_delay);
			newTitle_tl.to(title_h1, out_duration, textBlurObj, out_delay);
			// newTitle_tl.to(title_line, out_duration, {top:'-100px'}, out_delay);
			newTitle_tl.to(title_h2, out_duration, textBlurObj, out_delay);

		// - bind to scroll
		var newTitleScene = new ScrollMagic.Scene({
				triggerElement: title_el,
				triggerHook: '1.0', // when element enters
				// offset: -300, // for number
				// offset: ,
				duration: '150%'
			})
			.setTween(newTitle_tl)
			.addTo(controller);

		return newTitleScene;
	}

	// Create .title-box scenes
	var titleBoxScene1 = newTitleBoxScene($('#title1'));
	var titleBoxScene2 = newTitleBoxScene($('#title2'));
	var titleBoxScene3 = newTitleBoxScene($('#title3'));



	//------------------
	// Say Hello CTAs
	//-----------------------

	// Constructor function
	function newHelloBoxScene($boxEl) {

		// - element
		var box_el = $boxEl.get(0);
		var icon_el = $boxEl.find('.icon').get(0);
		var h5_el = $boxEl.find('h5').get(0);
		var p_el = $boxEl.find('p').get(0);

		var step1_dur = 1;
		var step2_dur = 1;

		// - text blur/focus objects
		var whiteTextBlur = {
			color:'rgba(255,255,255,0)',
			textShadow:'0 0 15px rgba(255,255,255,1)',
		}
		var whiteTextFocus = {
			color:'rgba(255,255,255,1)',
			textShadow:'0 0 15px rgba(255,255,255,0)',
		}

		// - timeline
		var hello_tl = new TimelineMax();
			// - inward animations
			hello_tl.to(icon_el, step1_dur, {top:'90%'}, 0);
			hello_tl.to(h5_el, step1_dur, whiteTextFocus, 0);
			hello_tl.to(p_el, step1_dur, whiteTextFocus, 0);
			// - outward animations
			hello_tl.to(icon_el, step2_dur, {top:'50%'}, step1_dur);
			hello_tl.to(h5_el, step2_dur, whiteTextBlur, step1_dur);
			hello_tl.to(p_el, step2_dur, whiteTextBlur, step1_dur);

		// - create scene
		var boxScene = new ScrollMagic.Scene({
				triggerElement: box_el,
				triggerHook: 'onEnter',
				offset: 100,
				duration: '120%'
			})
			.setTween(hello_tl)
			.addTo(controller);

		return boxScene;
	}

	// Create box scenes
	$('.slide2 .nav-box').each(function(){
		newHelloBoxScene( $(this) );
	});



	//------------------
	// Job Postings
	//-----------------------
	// - blur in and out text: title and p
	// - move button in and out of position

	// Constructor
	function newJobPostingScene($postEl) {

		// - elements
		var post_el = $postEl.get(0);
		var $titleBox = $postEl.find('.job-title-box');
		var titleBox_el = $titleBox.get(0);
		var $content = $postEl.find('.posting-description');
		var content_el = $content.get(0);
		var $buttonRow = $postEl.find('.button-row');
		var button_el = $buttonRow.find('.button').get(0);

		var in_duration = 1;
		var out_duration = 1;

		// - create timeline
		var job_tl = new TimelineMax();
			job_tl.to(content_el, in_duration, {
					textShadow:'0px 0px 0px rgba(0,0,0,0)', 
					color:'#363545'
				}, 0);
			job_tl.to(titleBox_el, in_duration, {
					textShadow:'0px 0px 0px rgba(255,255,255,0)', 
					color:'#FFF', 
					boxShadow:'0 0 20px 10px rgba(73,143,225, 0)', 
				}, 0);
			job_tl.to(button_el, (in_duration*3), {top:'-30px'}, 0);

		// Create Scene
		var jobScene = new ScrollMagic.Scene({
				triggerElement: post_el,
				triggerHook: 'onEnter',
				offset: 100,
				duration: '100%'
			})
			.setTween(job_tl)
			.addTo(controller);

		return jobScene;
	}

	// Create scene for each job posting
	$('.slide3 .job-posting').each(function(){
		newJobPostingScene( $(this) );
	});
}


module.exports = scrollAnimate;