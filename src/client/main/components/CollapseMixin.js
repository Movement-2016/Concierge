/* global $ */
import React from 'react';

/*
.expand-trigger {
  cursor: pointer;
}

.expand-icon.closed i {
}

.expand-icon.open i {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}

div.closed { 
  padding-top: 2px;
  padding-bottom: 2px;
}
*/

const ENABLE_COLLAPSE = false;

const CollapseMixin = base => class extends base {
  
  constructor() {
    super(...arguments);

    const { expanded = !ENABLE_COLLAPSE } = this.props;
    
    this.state = this.state 
                  ? {...this.state,expanded}
                  : {expanded};

    this.onToggleCollapse = this.onToggleCollapse.bind(this);                  
  }

  onToggleCollapse(e) {
    if( !ENABLE_COLLAPSE ) {
      return;
    }
    e.preventDefault();
    const { expanded } = this.state;
    const { collapsibleSelector } = this;
    if( expanded ) {
      $(collapsibleSelector).slideUp( 'slow', setTimeout( () => this.setState({expanded:false}), 200 ) );
    } else {
      this.setState({expanded:true}, ()=> $(collapsibleSelector).slideDown('slow') );
    }
  }

  get expandIcon() {
    if( !ENABLE_COLLAPSE ) {
      return null;
    }
    const cls = this.state.expanded ? 'open' : 'closed';
    return <span className={cls + ' expand-icon'}><i className="material-icons">play_arrow</i></span>;
  }
};

module.exports = CollapseMixin;