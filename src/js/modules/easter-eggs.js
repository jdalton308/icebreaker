
var $ = require('jquery');

// ----------------------
// Click on airplane polygon, change its color
//------------------
function airplaneEgg() {
	var $airplanes = $('[id$="-small-poly"]');
	var blueHex = '#498FE1';
	var redHex = '#D0011B';

	$airplanes.click(function(){
		var $this = $(this);
		var $fillGroups = $this.find('g .fill-change-group');

		var currentColor = $fillGroups.attr('fill');
		var newColor = (currentColor == redHex) ? blueHex : redHex;

		$fillGroups.each(function(){
			TweenMax.to(this, 0.5, {attr:{fill:newColor}});
		});
	});
}


function init() {
	airplaneEgg();
}


module.exports = init;