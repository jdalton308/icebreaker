
var $ = require('jquery');

var Loading = require('./modules/loading.js');
var Data = require('./modules/model-data.js');
var ScaleeBuilder = require('./modules/scalee-build.js');
var JobsBuilder = require('./modules/jobs-build.js');

var ScrollAnimate = require('./modules/scroll-animation.js');
var ScaleeSorter = require('./modules/scalee-sorter.js');
var ScaleeBios = require('./modules/scalee-bios.js');
var ScaleeScrolling = require('./modules/scalee-scrolling.js');
var Leaderboard = require('./modules/scalee-leaderboard.js');
var TwoTruths = require('./modules/scalee-two-truths.js');
var EasterEggs = require('./modules/easter-eggs.js');



// Show loading slide until pageload event
Loading.show();

// Get data, then build page
// Data.getData().then(function(){
	ScaleeBuilder.build();
	JobsBuilder.build();

	// Wait for images to load, then run scripts and show page
	$(window).on('load', function(){

		// - Init scroll animations (has check for mobile)
		ScrollAnimate.init();

		// - Init other interactions
		ScaleeSorter.init();
		ScaleeBios.init();
		ScaleeScrolling.init();
		Leaderboard.init();
		TwoTruths.init();
		EasterEggs();

		// - Center scalees
		ScaleeScrolling.center();

		// - Finally hide loader
		Loading.hide();
	});
// });