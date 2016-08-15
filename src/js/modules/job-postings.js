
var $ = require('jquery');

function init() {
	// Just make accordions work. Most is css
	var $postings = $('.job-posting');
	var $titleBars = $postings.children('.title-bar');

	$titleBars.click(function(){
		var $this = $(this);
		$this.parents('.job-posting').toggleClass('open');
	});
}

module.exports = init;