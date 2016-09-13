
var $ = require('jquery');
var Data = require('./model-data.js');
var JobsData = Data.jobsData;

var $postingCont = $('.job-postings');


// Post HTML Structure
//---------------
// <div class="job-posting">
// 	<div class="job-title-box">
// 		<h4>Sign Spinner</h4>
// 		<p>Marketing</p>
// 	</div>
// 	<div class="posting-content">
// 		<div class="posting-description">
// 			<p>Lorizzle izzle dolizzle doggy amizzle, consectetizzle adipiscing elit. Nullam sapizzle velizzle, stuff volutpat, suscipit quizzle, fo shizzle shit, arcu. Pellentesque egizzle doggy. Ass erizzle.</p> 
// 			<p>Its fo rizzle izzle dolor dapibizzle turpis tempizzle gizzle. That's the shizzle pellentesque brizzle daahng dawg turpis. Vestibulum in tortor. Pellentesque eleifend rhoncizzle gangster. In break it down habitasse platea dictumst. Yippiyo dapibus. Curabitur gangster urna, pretizzle eu, mattis ac, gangster vitae, fo shizzle. You son of a bizzle dang. Integer sempizzle velit sizzle purus.</p>
// 		</div>
// 		<p class="button-row">
// 			<a href="#" class="button blue" target="_blank">APPLY NOW</a>
// 		</p>
// 	</div>
// </div>


// HTML Template
//--------------------
var $postTemplate = $('<div class="job-posting"></div>');
var $postTitleTemp = $('<div class="job-title-box"> <h4></h4> <p></p> </div>');
var $postContentTemp = $('<div class="posting-content"> <div class="posting-description"></div> <p class="button-row"></p> </div>');
var $postBtn = $('<a href="#" class="button blue" target="_blank">APPLY NOW</a>');


// Build
//-------------
function buildPosts() {
	JobsData.forEach(function(postObj, i){
		// add title copy
		var $newTitle = $postTitleTemp.clone();
		$newTitle.find('h4').text(postObj.title);
		$newTitle.find('p').text(postObj.team);

		// add description
		var $newContent = $postContentTemp.clone();
		$newContent.find('.posting-description').append('<p>'+ postObj.description +'</p>');

		// add button link
		var $newBtn = $postBtn.clone();
		$newBtn.attr('href', postObj.link);

		// combine templates
		var $newPost = $postTemplate.clone();
		$newContent.find('.button-row').append($newBtn);
		$newPost.append($newTitle).append($newContent);

		// add newPost to page
		$postingCont.append($newPost);
	});
}



module.exports.build = buildPosts;