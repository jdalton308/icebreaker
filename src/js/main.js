
var $ = require('jquery');

var ScaleeSorter = require('./modules/scalee-sorter.js');
var ScaleeBios = require('./modules/scalee-bios.js');
var TwoTruths = require('./modules/two-truths.js');
var ScrollAnimate = require('./modules/scroll-animation.js');
var Loading = require('./modules/loading.js');

// Show loading slide until pageload event
Loading.show();

// Wait for images to load, then run scripts and show page
$(window).on('load', function(){
	console.log('window loaded');

	ScaleeSorter.init();
	ScaleeBios.init();
	TwoTruths.init();
	ScrollAnimate();

	window.setTimeout(function(){
		ScaleeSorter.center();
		Loading.hide();
	}, 1500);

});