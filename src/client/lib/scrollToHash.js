import scrollToElement from './scrollToElement';

const scrollToHash = (offset,delay) => {
  if( location.hash ) {
    const elemName = location.hash.replace('#','');
    const elem = document.getElementById(elemName);
    elem && scrollToElement('#' + elemName,offset,delay);
  }    
};

module.exports = scrollToHash;