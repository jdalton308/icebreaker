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
	title1_tl.to(slide1, 2, {height: '80vh', ease: Elastic.easeOut.config(1, 0.5)});

	// Landing floating polygon
	//--------------------------
	var title1_poly = TweenMax.to(landingPoly, 1, {right:'90%', top:'50%', scale: 0.7, rotation:'80deg'});

	var landingPolyScene = new ScrollMagic.Scene({
			triggerElement: slide1,
			triggerHook: 'onLeave',
			duration: '100%'
		})
		.setTween(title1_poly)
		.addTo(controller);

	// Landing scroll-out
	//-------------------------
	var title_out_dur = 1;

	var title1_tlout = new TimelineMax();
	// title1_tlout.to(title1_el, title_out_dur, {top: '150px'}, 0);
	title1_tlout.to(title1_num, title_out_dur, {top: '-150px'}, 0);
	title1_tlout.to(title1_h1, title_out_dur, {top: '-70px'}, 0);
	title1_tlout.to(title1_line, title_out_dur, {top: '0px'}, 0);
	title1_tlout.to(title1_h2, title_out_dur, {top: '80px'}, 0);

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

	// Adjust background height
	//--------------------------
	var sorter_tl = new TimelineMax();
	sorter_tl.to(scalee_bgel, 1, {height:'40%'}, 0);
	sorter_tl.to(scaleeCont_el, 1, {top:'15vh'}, 0);

	var scaleeScene = new ScrollMagic.Scene({
			triggerElement: slide2_el,
			triggerHook: '0.8',
			duration: '60%'
		})
		.setTween(sorter_tl)
		.addTo(controller);



	//------------------
	// Large polygon in background
	//-----------------------
	// - Fix to window and rotate during scroll

	var largePoly_el = document.getElementById('large-poly');

	var poly_tl = new TimelineMax();
	poly_tl.to(largePoly_el, 1, {rotation:'90deg', top:'-20%'});

	var polyScene = new ScrollMagic.Scene({
			triggerElement: slide1, // start immediately
			triggerHook: 'onLeave',
			duration: 0 // last entire page
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

	// Create scenes
	var titleScene2 = newTitleScene($('#title2'));
	var titleScene3 = newTitleScene($('#title3'));

}


module.exports = scrollAnimate;