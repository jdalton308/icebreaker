'use strict';

var $ = require('jquery');
// var ScrollMagic = require('ScrollMagic');

// NOTE: All GSAP dependencies are Scrollmagic plugins do not work with Browserify, so they have they are concatenated in their own gulp task, then loaded on the page in their own file

// var TweenLite = require('../../../node_modules/gsap/src/uncompressed/TweenLite.js');
// var TweenMax = require('../../../node_modules/gsap/src/uncompressed/TweenMax.js');
// var TimelineMax = require('../../../node_modules/gsap/src/uncompressed/TimelineMax.js');
// var TimelineLite = require('../../../node_modules/gsap/src/uncompressed/TimelineLite.js');
// var gsap = require('gsap');
// var animation.gsap = require('../../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js');



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
	title1_tl.to(title1_line, 0.5, {opacity: 1, ease: Expo.easeOut});
	// title1_tl.to(slide1, 1.3, {height: '80vh', ease: Elastic.easeOut.config(1, 0.5)});

	// Landing floating polygon
	//--------------------------
	//ease: Power2.easeInOut
	var title1_polytl = new TimelineMax({repeat:-1, yoyo:true});
	title1_polytl.to(landingPoly, 12, {right:'50%', top:'0%', scale: 0.7, ease: Power0.easeNone});
	title1_polytl.to(landingPoly, 7, {right:'90%', top:'5%', scale: 0.8, ease: Power0.easeNone});
	title1_polytl.to(landingPoly, 12, {right:'0', top:'0', scale: 1.0, ease: Power0.easeNone});

	// Landing scroll-out
	//-------------------------
	var title_out_dur = 1;

	var title1_tlout = new TimelineMax;
	title1_tlout.to(title1_el, title_out_dur, {top: 0}, 0);
	title1_tlout.to(title1_num, title_out_dur, {opacity: 0.8, top: '-100px'}, 0);
	title1_tlout.to(title1_h1, title_out_dur, {opacity: 0.8, top: '-90px', textShadow: '0 0 3px #000'}, 0);
	title1_tlout.to(title1_line, title_out_dur, {opacity: 0.5, top: '-70px'}, 0);
	title1_tlout.to(title1_h2, title_out_dur, {opacity: 0.8, top: '-50px', textShadow: '0 0 3px #000'}, 0);

	var titleScene1 = new ScrollMagic.Scene({
			triggerElement: slide1,
			triggerHook: 'onLeave',
			duration: '100%' // since slide0 is only 80vh
		})
		.setTween(title1_tlout)
		.addTo(controller);

}


module.exports = scrollAnimate;