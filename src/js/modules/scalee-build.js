
var $ = require('jquery');
var Data = require('./model-data.js');


// Elements
//-------------
var $scaleeCont = $('.scalee-cont');


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
					leaders: {};
				};
			}

			// - add reference to scalee in leaderObj
			gameObj.leaders[rankObj.place] = scaleeObj.id;
		});
	}
}


// Create Location, Team, and Quirks arrays
//-----------------------
function checkTag(tagString, scaleeObj) {
	// Check if scalee even has the tag
	if (scaleeObj[tagString] && scaleeObj[tagString].length) {
		var trackingArray = tags[tagString];

		// For each tag, check if already in tagsObj array, and if not, add
		scaleeObj[tagString].forEach(function(spot){
			if ( !trackingArray.indexOf(spot) ) {
				trackingArray.push(spot);
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
		src: scaleeObj.src,
		id: scaleeObj.id,
		'data-tags': tags,
		'data-logo': scaleeObj.logo
	});

	return $scalee;
}


// Click handler
//--------------------
function clickHandler(e) {
	
}



// Do it
//-------------
function createScaless(data) {
	data.forEach(function(scaleeObj, i){

		// Add tags to tagsObj
		checkTag('location', scaleeObj);
		checkTag('team', scaleeObj);
		checkTag('quirks', scaleeObj);

		// Add to leaderboard obj
		addToLeaders(scaleeObj);

		// Build scalee, add to page
		var $scalee = buildScalee(scaleeObj);
		$scaleeCont.append($scalee);

		// Bind click event
		$scalee.click(function(){

		})
	});
}