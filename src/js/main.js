
var $ = require('jquery');

var ScaleeBuilder = require('./modules/scalee-build.js');
var JobsBuilder = require('./modules/jobs-build.js');

var ScaleeSorter = require('./modules/scalee-sorter.js');
var ScaleeBios = require('./modules/scalee-bios.js');
var ScaleeScrolling = require('./modules/scalee-scrolling.js');
var Leaderboard = require('./modules/scalee-leaderboard.js');
var TwoTruths = require('./modules/scalee-two-truths.js');

var ScrollAnimate = require('./modules/scroll-animation.js');
var Loading = require('./modules/loading.js');
var EasterEggs = require('./modules/easter-eggs.js');
var Util = require('./modules/util.js');


// Show loading slide until pageload event
Loading.show();
ScaleeBuilder.build();
JobsBuilder.build();

// Wait for images to load, then run scripts and show page
$(window).on('load', function(){

	// - Init scroll animations only on mobile...
	if ( !Util.isMobile() ) {
		ScrollAnimate.init();
	}

	// - Init other interactions
	ScaleeSorter.init();
	ScaleeBios.init();
	ScaleeScrolling.init();
	Leaderboard.init();
	TwoTruths.init();
	EasterEggs();

	// - Center scalees
	ScaleeScrolling.center();

	// - Then hide loader and animate landing page...
	window.setTimeout(function(){
		Loading.hide();
	}, 1000);

});