
var $ = require('jquery');
// var ScrollNav = require('./modules/scroll-nav.js');
var ScaleeSorter = require('./modules/scalee-sorter.js');
var ScaleeBios = require('./modules/scalee-bios.js');
// var JobPostings = require('./modules/job-postings.js');
var TwoTruths = require('./modules/two-truths.js');
var ScrollAnimate = require('./modules/scroll-animation');


$(function(){
	// ScrollNav.init();
	ScaleeSorter.init();
	ScaleeBios.init();
	// JobPostings();
	TwoTruths.init();
	ScrollAnimate();

	window.setTimeout(function(){
		ScaleeSorter.center();
	}, 1500);
	
});