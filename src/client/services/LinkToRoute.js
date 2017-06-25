import React  from 'react';

/*
  href        - destination 
  host        - any truthy value that indicates to let the browser handle the link
  onNavigate  - callback will short circuit any action and call back with this.props.model
  text        - prints this text
  {children}  - prints children

  all properties are passed to <a /> DOM element
*/
class Link extends React.Component {

  constructor() {
    super(...arguments);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e) {
    let { href, host, onNavigate, to } = this.props;

    href = href || to;

    if( onNavigate ) {
      e.preventDefault();
      e.stopPropagation();
      onNavigate(this.props.model);      
    } else {
      if( !host ) {
        e.preventDefault();
        e.stopPropagation();
        if( typeof href === 'string' && href !== '#') {
          Link.navigateTo(href);
        }
      }    
    }
    return true;
  }

  render() {

    let props = {...this.props};
    props.to && !props.href && (props.href = props.to);
    const { text, children } = props;

    return (
      <a {...this.props} onClick={this.handleClick} >
       {text}{children}
      </a>
    );
  }
}

Link.navigateTo = function(path) {
  // can't import because of circular dependencies
  var router = require('./router').service;
  router.navigateTo( path );  
};

module.exports = Link;

