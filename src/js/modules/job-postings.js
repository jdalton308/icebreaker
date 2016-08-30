// 'use strict';

// var $ = require('jquery');


// // ------------------------
// // Job Postings
// // ------------------------
// // - On click of posting tile...
// // 1/ Set position to top left of .job-postings
// // 2/ Insert a placeholder, so the other postings don't reorganzie
// // 2/ Change size of box to be width of .job-postings
// // 3/ Change height of box to allow content to show
// // 4/ Show .posting-content copy


// // Elements
// // ---------------
// var $postingCont = $('.job-postings');
// var $postings = $postingCont.children('.job-posting');
// var $titleBars = $postings.children('.title-bar');
// var $postingClose = $titleBars.children('.close-btn');

// // State Variables
// //------------------
// var originalPos;


// // Functions
// //-----------------
// function init() {

// 	// Open Posting------
// 	$postings.click(postingClickHandler);

// 	// Close Posting-------
// 	$postingClose.click(postingCloseHandler);
// }

// function postingClickHandler(){
// 	var $this = $(this);
// 	var $placeholder = $('<div class="job-posting placeholder"></div>');

// 	// - insert placeholder
// 	$placeholder.insertAfter($this);

// 	// - position posting
// 	originalPos = $this.position();
// 	$this.addClass('open-start').css({
// 		top: originalPos.top,
// 		left: originalPos.left
// 	});
// 	window.setTimeout(function(){
// 		$this.animate({
// 		// - animate posting position
// 			top: 0,
// 			left: 0
// 		}, 500);
// 	}, 100);

// 	window.setTimeout(function(){
// 		$this.addClass('open-end');
// 			// - change colors
// 			// - show description
// 			// - show close btn
// 	}, 700);

// 	// - remove click handler on this
// 	console.log('turning off postings click...');
// 	$postings.off();
// }

// function postingCloseHandler(ev){
// 	ev.stopPropagation();

// 	var $this = $(this);
// 	var $postingParent = $this.closest('.open-end');

// 	console.log('OriginalPos:');
// 	console.log(originalPos);

// 	// - animate back to position
// 	$postingParent.addClass('close-start');

// 	window.setTimeout(function(){
// 		$postingParent.removeClass('open-end close-start').animate({
// 			top: originalPos.top,
// 			left: originalPos.left
// 		}, 500);
// 	}, 1000);
		
// 	window.setTimeout(function(){
// 		// - remove placeholder
// 		$postingParent.siblings('.placeholder').remove();
// 		$postingParent.removeClass('open-start').attr('style', '');
// 	}, 1700);


// 	// - re-bind click event
// 	console.log('rebinding postings click...');
// 	$postings.click(postingClickHandler);
// }


// // Exports
// //---------------
// module.exports = init;