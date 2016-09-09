
// var $ = require('jquery');
// var ScrollAnimate = require('./scroll-animation.js');

// var $window = $(window);
// var $body = $('body');
// var $landingSlide = $('.slide0');

// // if at top, animate the scroll pop-up and arrow,
// // else, trigger event when at top to do so

// function checkTop(){
// 	return $body.scrollTop();
// }

// function triggerFold(){
// 	// $body.addClass('fixed');
// 	$landingSlide.addClass('bounce-up');

// 	// // allow time for animation, then reset reference to scrolling positions
// 	// window.setTimeout(function(){
// 	// 	// $body.removeClass('fixed');
// 	// }, 1500);
// }


// // every 500ms, check position until at the top, instead of watching scroll	
// function watchForTop() {
// 	var topWatcher = window.setInterval(function(){
// 		if ( !checkTop() ){
// 			triggerFold();
// 			window.clearInterval(topWatcher);
// 		}
// 	}, 500);
// }

// function init() {
// 	var initialPos = checkTop();

// 	if (!initialPos) {
// 		triggerFold();
// 	} else {
// 		watchForTop();
// 	}
// }


// module.exports = init;