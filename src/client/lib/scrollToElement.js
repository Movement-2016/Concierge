/* global $ */

const _scrollToElement = (el, offset = 10) => {
  var $el = $(el);
  if ($el[0]) {
    var top = $el.offset().top;
    $('html,body').animate(
      { scrollTop: top - offset },
      {
        duration: 400,
        easing: 'swing',
      }
    );
  }
};

const scrollToElement = (el, offset, delay) => {
  if (delay) {
    setTimeout(() => _scrollToElement(el, offset), delay);
  } else {
    _scrollToElement(el, offset);
  }
};

module.exports = scrollToElement;
