/* global $ */

const fixedHeader = true;

function scrollToElement(e, offset) {

  const defaultOffset = fixedHeader
    ? document.getElementById('main-nav').offsetHeight
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
