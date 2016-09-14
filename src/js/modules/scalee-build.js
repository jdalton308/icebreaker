'use strict';

var $ = require('jquery');
var Data = require('./model-data.js');
var Util = require('./util.js');
var ScaleeBios = require('./scalee-bios.js');

var ScaleeData = Data.scaleeData;
var IMG_PATH = '/img/';


// Elements
//-------------
var $scaleeCont = $('.scalee-cont');
var isMobile = Util.isMobile();


// Sub-data
// ---------------------
var leaderObj = {};
var tags = {
	location: [],
	team: [],
	quirks: []
};



// Create Leaderboard Obj
//-----------------------
function addToLeaders(scaleeObj){

	// - Check if scalee is on a leaderboard
	if (scaleeObj.leaderboard && scaleeObj.leaderboard.length) {

		var leaderboadArray = scaleeObj.leaderboard;

		// - loop through leaderboad objs within scalee's data
		leaderboadArray.forEach(function(rankObj, i){

			var gameObj = leaderObj[rankObj.gameId];

			// - if no object for this game in leaderObj, create new one
			if (!gameObj) {
				gameObj = {
					name: rankObj.gameName,
					leaders: {}
				};

				// - add game to leaderObj
				leaderObj[rankObj.gameId] = gameObj;
			}

			// - add reference to scalee in leaderObj
			gameObj.leaders[rankObj.place] = scaleeObj.id;
		});

	}
}

// Eventual leaderObj structure
//-------------------------
// var leaders = {
// 	"discgolf": {
// 		"name": "Disc Golf",
// 		"leaders": {
// 			1: "person2",
// 			2: "person5",
// 			3: "person8",
// 		}
// 	},
// };



// Create Location, Team, and Quirks arrays
//-----------------------
function checkTag(tagCategory, scaleeObj) {
	// Check if scalee even has the tag (location/team/quirk)
	if (scaleeObj[tagCategory] && scaleeObj[tagCategory].length) {
		var trackingArray = tags[tagCategory];

		// For each tag, check if already in tagsObj array, and if not, add
		scaleeObj[tagCategory].forEach(function(tag){
			if ( trackingArray.indexOf(tag) == -1 ) {
				trackingArray.push(tag);
			}
		});
	}
}


// Build Scalee html
//-----------------------
function buildScalee(scaleeObj) {
	var $scalee = $('<img>');

	// - create filter tags
	var locations = scaleeObj.location.join(' ');
	var teams = scaleeObj.team.join(' ');
	var quirks = scaleeObj.quirks.join(' ');

	var tags = locations + ' ' + teams + ' ' + quirks;

	// - add src, id, and data tags
	$scalee.attr({
		src: IMG_PATH + scaleeObj.src,
		title: scaleeObj.name,
		id: scaleeObj.id,
		'data-tags': tags,
		'data-logo': scaleeObj.logo
	});

	return $scalee;
}


// Do it
//-------------
function createScaless() {
	ScaleeData.forEach(function(scaleeObj, i){

		// Add tags to tagsObj
		checkTag('location', scaleeObj);
		checkTag('team', scaleeObj);
		checkTag('quirks', scaleeObj);

		// Add to leaderboard obj
		addToLeaders(scaleeObj);

		// Build scalee, add to page
		var $scalee = buildScalee(scaleeObj);
		$scaleeCont.prepend($scalee);

		// Bind click event
		$scalee.click(ScaleeBios.clickHandler);
	});


	// Alphabetize tag arrays
	tags.location.sort().reverse(); // Put 'Boulder' on top, so put it last
	tags.team.sort();
	tags.quirks.sort();
}



// Exports
//-------------
module.exports.build = createScaless;
module.exports.leaderData = leaderObj;
module.exports.tagData = tags;