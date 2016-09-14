/* global $ */

// from https://github.com/marklagendijk/jquery.tabbable/blob/master/jquery.tabbable.js

function selectNextElement(selector){
  var selectables = $(selector);
  var current = $(':focus');
  var nextIndex = 0;
  if(current.length === 1){
    var currentIndex = selectables.index(current);
    if(currentIndex + 1 < selectables.length){
      nextIndex = currentIndex + 1;
    }
  }

  selectables.eq(nextIndex).focus();
}

function selectPrevElement(selector){
  var selectables = $(selector);
  var current = $(':focus');
  var prevIndex = selectables.length - 1;
  if(current.length === 1){
    var currentIndex = selectables.index(current);
    if(currentIndex > 0){
      prevIndex = currentIndex - 1;
    }
  }

  selectables.eq(prevIndex).focus();
}

module.exports = {
  selectPrevElement,
  selectNextElement
};