
var $ = require('jquery');
var Data = require('./model-data.js');

var JobsData = Data.jobsData;
var $postingCont = $('.job-postings');


// Desired HTML structure for each post
//----------------------------------------------
// <div class="job-posting">
// 	<div class="job-title-box">
// 		<h4>Job Title</h4>
// 		<p>Team</p>
// 	</div>
// 	<div class="posting-content">
// 		<div class="posting-description">
// 			<p>Post description</p>
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