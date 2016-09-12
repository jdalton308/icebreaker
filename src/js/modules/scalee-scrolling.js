
var $ = require('jquery');


var $scaleeCont = $('.scalee-cont');
var $scaleeLeftBtn = $('.scalee-scroll.prev');
var $scaleeRightBtn = $('.scalee-scroll.next');



// Scalee lateral scrolling
//-----------------------------
var scaleeOffset;

function centerScalees() {
  // Just reset the translateX CSS property to 50%;
  scaleeOffset = 0.5;
  setTranslate();
}

function scrollScalees(dist) {
  // Dont's allow scrolling off screen
  if ( (scaleeOffset >= 0.95 && dist > 0) || 
        (scaleeOffset <= 0.05 && dist < 0) ) {
    return;
  }

  scaleeOffset += dist;
  setTranslate()
}

function setTranslate() {
  var offsetString = (100 * scaleeOffset) + '%';

  $scaleeCont.css({
    transform: 'translateX(' + offsetString +')'
  });
}



// Bind events
//------------
function eventsOn() {

  // Scroll scalees ------
  $scaleeLeftBtn.click(function(){
    scrollScalees(0.1);
  });
  $scaleeRightBtn.click(function(){
    scrollScalees(-0.1);
  });
}


module.exports.init = eventsOn;
module.exports.center = centerScalees;