/* global $ */

const DO_FIXED_HEADER          = true;
const FIXED_KNOWN_MAGIC_OFFSET = 10;

function scrollToElement(e, offset) {

  const defaultOffset = DO_FIXED_HEADER         
    ? document.querySelector('.main-nav').offsetHeight + FIXED_KNOWN_MAGIC_OFFSET
    : 0;
  var $e = $(e);
  if( $e[0] ) {
    offset = offset || defaultOffset;
    var top = $e.offset().top;
    $('html,body').animate(
        { scrollTop: top - offset },
        { duration: 400,
          easing: 'swing'
        }
      );
  }
}

module.exports = scrollToElement;
