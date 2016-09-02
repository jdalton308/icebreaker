
var $ = require('jquery');

var $window = $(window);
var $body = $('body');
var $loadingSlide = $('.loading-screen');

// Show loading screen
function showLoading() {
	$body.addClass('fixed');
	$loadingSlide.addClass('show');
}

// Hide loading screen
function hideLoading() {
	$loadingSlide.addClass('hide');
	window.setTimeout(function(){
		$body.removeClass('fixed');
		$loadingSlide.removeClass('show hide');
	}, 1100);
}



module.exports.show = showLoading;
module.exports.hide = hideLoading;