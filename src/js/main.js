
var $ = require('jquery');

var ScaleeSorter = require('./modules/scalee-sorter.js');
var ScaleeBios = require('./modules/scalee-bios.js');
var TwoTruths = require('./modules/two-truths.js');
var ScrollAnimate = require('./modules/scroll-animation.js');
var Loading = require('./modules/loading.js');
var Landing = require('./modules/landing.js');

// Show loading slide until pageload event
Loading.show();

// Wait for images to load, then run scripts and show page
$(window).on('load', function(){

	ScrollAnimate.init();
	ScaleeSorter.init();
	ScaleeBios.init();
	TwoTruths.init();
	ScaleeSorter.center();

	window.setTimeout(function(){
		Loading.hide();

		window.setTimeout(function(){
			Landing();
		}, 1000)
	}, 2000);

});