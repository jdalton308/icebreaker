
var $ = require('jquery');

var ScaleeSorter = require('./modules/scalee-sorter.js');
var ScaleeBios = require('./modules/scalee-bios.js');
var TwoTruths = require('./modules/two-truths.js');
var ScrollAnimate = require('./modules/scroll-animation');


$(function(){
	ScaleeSorter.init();
	ScaleeBios.init();
	TwoTruths.init();
	ScrollAnimate();

	window.setTimeout(function(){
		ScaleeSorter.center();
	}, 1500);

});