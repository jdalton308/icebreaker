'use strict';

var $ = require('jquery');

// NOTE: All GSAP and Scrollmagic dependencies do not work with Browserify, so they have their own gulp task, and are loaded on the page in their own file


// -------------------------------
// Scroll-controlled Animations
// -------------------------------

function scrollAnimate() {

	// Init Scroll Magic controller
	var controller = new ScrollMagic.Controller();


	//----------------
	// Landing Slide
	//--------------------
	var slide1 = $('.slide0').get(0);
	var $title1 = $('#title1');

	var title1_el = $title1.get(0);
	var title1_num = $title1.find('.slide-number').get(0);
	var title1_h1 = $title1.find('h1').get(0);
	var title1_line = $title1.find('.underline').get(0);
	var title1_h2 = $title1.find('h2').get(0);

	var landingPoly = document.getElementById('landing-poly');

	// Since we have GSAP here, use it to animate in the landing, then use scrollmagic to animate it out
	var intro_dur = 1;
	var intro_delay = 1;


	// Landing text animation
	//-----------------------
	var title1_tl = new TimelineMax();
	title1_tl.to(title1_el, intro_dur, {top: 0}, intro_delay);
	title1_tl.to(title1_num, intro_dur, {opacity: 1, top: 0}, intro_delay);
	title1_tl.to(title1_h1, intro_dur, {opacity: 1, top: 0}, intro_delay);
	title1_tl.to(title1_h2, intro_dur, {opacity: 1, top: 0}, intro_delay);
	title1_tl.to(title1_line, 0.8, {opacity: 1, ease: Expo.easeOut});
	// title1_tl.to(slide1, 2, {height: '80vh', ease: Elastic.easeOut.config(1, 0.5)});


	// Landing scroll-out
	//-------------------------
	var title_out_dur = 1;

	var title1_tlout = new TimelineMax();
	// title1_tlout.to(title1_el, title_out_dur, {top: '150px'}, 0);
	title1_tlout.to(title1_num, title_out_dur, {top: '-150px', opacity:0}, 0);
	title1_tlout.to(title1_h1, title_out_dur, {top: '-70px', opacity:0}, 0);
	title1_tlout.to(title1_line, title_out_dur, {top: '0px', opacity:0}, 0);
	title1_tlout.to(title1_h2, title_out_dur, {top: '80px', opacity:0}, 0);

	var landingTextScene = new ScrollMagic.Scene({
			triggerElement: slide1,
			triggerHook: 'onLeave',
			duration: '100%'
		})
		.setTween(title1_tlout)
		.addTo(controller);



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
			triggerHook: '0.6'
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
	var smallPoly_tl = new TimelineMax();
		smallPoly_tl.to(landingPoly, 1, {right:'100%', top:'-20%', scale:0.7, rotation:'80deg', zIndex:0});
		smallPoly_tl.to(landingPoly, 3, {right:'60%', top:'-5%', scale:0.5, rotation:'130deg'});
	// var title1_poly = TweenMax.to(landingPoly, 1, {right:'90%', top:'50%', scale: 0.7, rotation:'80deg'});

	var landingPolyScene = new ScrollMagic.Scene({
			triggerElement: slide1,
			triggerHook: 'onLeave',
			duration: '400%'
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
			duration: '400%' // last entire page
		})
		.setTween(poly_tl)
		.addTo(controller);



	//------------------
	// Last two title-boxes
	//-----------------------

	// Constructor function
	function newTitleScene($titleBox) {

		// - define elements
		var title_el = $titleBox.get(0);
		var title_num = $titleBox.find('.slide-number').get(0);
		var title_h1 = $titleBox.find('h1').get(0);
		var title_line = $titleBox.find('.underline').get(0);
		var title_h2 = $titleBox.find('h2').get(0);

		var in_duration = 1;
		var in_delay = 0;
		var out_duration = 1;

		// - create timeline
		var newTitle_tl = new TimelineMax();
			// - animations in
			newTitle_tl.to(title_el, in_duration, {top: 0}, in_delay);
			newTitle_tl.to(title_num, in_duration, {opacity: 1, top: 0}, in_delay);
			newTitle_tl.to(title_h1, in_duration, {opacity: 1, top: 0}, in_delay);
			newTitle_tl.to(title_h2, in_duration, {opacity: 1, top: 0}, in_delay);
			newTitle_tl.to(title_line, in_duration, {opacity: 1, ease: Expo.easeOut}, in_delay);
			// - animations out
			// newTitle_tl.to(title_el, title_out_dur, {top: '150px'}, (in_duration+in_delay));
			newTitle_tl.to(title_num, title_out_dur, {top: '-150px'}, (in_duration+in_delay));
			newTitle_tl.to(title_h1, title_out_dur, {top: '-70px'}, (in_duration+in_delay));
			newTitle_tl.to(title_line, title_out_dur, {top: '0px'}, (in_duration+in_delay));
			newTitle_tl.to(title_h2, title_out_dur, {top: '80px'}, (in_duration+in_delay));

		// - bind to scroll
		var newTitleScene = new ScrollMagic.Scene({
				triggerElement: title_el,
				triggerHook: 'onEnter',
				duration: '100%'
			})
			.setTween(newTitle_tl)
			.addTo(controller);

		return newTitleScene;
	}

	// Create .title-box scenes
	// var titleScene2 = newTitleScene($('#title2'));
	// var titleScene3 = newTitleScene($('#title3'));



	//------------------
	// Say Hello CTAs
	//-----------------------

	// Constructor function
	function newHelloBoxScene($boxEl) {
		// Move icon
		// Leave text
		// Move whole el
		// Move polygon behind
		var box_el = $boxEl.get(0);
		var icon_el = $boxEl.find('.icon').get(0);
		var h5_el = $boxEl.find('h5').get(0);
		var p_el = $boxEl.find('p').get(0);

		var step1_dur = 1;
		var step2_dur = 1;

		var hello_tl = new TimelineMax();
		// - inward animations
		hello_tl.to(icon_el, step1_dur, {top: 0}, 0);
		hello_tl.to(h5_el, step1_dur, {textShadow:'0 0 0 transparent'}, 0);
		hello_tl.to(p_el, step1_dur, {textShadow:'0 0 0 transparent'}, 0);
		// - outward animations
		hello_tl.to(icon_el, step2_dur, {top:'-50px'}, step1_dur);
		hello_tl.to(h5_el, step2_dur, {textShadow:'0 0 10px #FFF'}, step1_dur);
		hello_tl.to(p_el, step2_dur, {textShadow:'0 0 10px #FFF'}, step1_dur);

		var boxScene = new ScrollMagic.Scene({
				triggerElement: box_el,
				triggerHook: 'onEnter',
				duration: '100%'
			})
			.setTween(hello_tl)
			.addTo(controller);

		return boxScene;
	}

	// Create box scenes
	// $('.slide2 .nav-box').each(function(){
	// 	newHelloBoxScene( $(this) );
	// });



	//------------------
	// Job Postings
	//-----------------------
	// - blur in and out text: title and p
	// - move button in and out of position
	// - 

	// Constructor
	function newJobPostingScene($postEl) {

		// - elements
		var post_el = $postEl.get(0);
		var $titleBox = $postEl.find('.job-title-box');
		var $content = $postEl.find('posting-description');
		var content_el = $content.get(0);
		var $buttonRow = $postEl.find('.button-row');
		var button_el = $buttonRow.find('.button').get(0);

		var in_duration = 1;
		var pause_duration = 5;
		var out_duration = 1;
		var outDelay = pause_duration + out_duration;

		// - create timeline
		var job_tl = new TimelineMax();
		job_tl.to(content_el, in_duration, {textShadow: '0 0 0 transparent'}, 0);
		job_tl.to(button_el, in_duration, {top: 0}, 0);
		job_tl.to(content_el, out_duration, {textShadow: '0 0 15px #000'}, outDelay);
		job_tl.to(button_el, out_duration, {top:'-100px'}, outDelay);

		// Create Scene
		var jobScene = new ScrollMagic.Scene({
				triggerElement: post_el,
				triggerHook: 'onEnter',
				duration: '100%'
			})
			.setTween(job_tl)
			.addTo(controller);

		return jobScene;
	}

	// Create scene for each job posting
	// $('.slide3 .job-posting').each(function(){
	// 	newJobPostingScene( $(this) );
	// });
}


module.exports = scrollAnimate;