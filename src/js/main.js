
var ScrollNav = require('./modules/scroll-nav.js');
var ScaleeSorter = require('./modules/scalee-sorter.js');
var ScaleeBios = require('./modules/scalee-bios.js');
var JobPostings = require('./modules/job-postings.js');
var TwoTruths = require('./modules/two-truths.js');

// ScrollNav.init();
ScaleeSorter.init();
ScaleeBios.init();
JobPostings();
TwoTruths.init();



// If mobile
// X - Don't use ScrollNav. At all
// X- Scalee sorter control-panel opens like accordion
// X- Scalee filters in control-panel can be scrolled laterally
// - Scalee bio is totally different. Simpler
	// - Bind click event immediately, not when in 'active2'
	// - Just copy the clicked img src attribute, and insert into .info-card
	// - Show info card fixed. Add fixed class to body to stop scroll

// - Sort() is same
// - Job postings are the same
// - Two truths game is the same