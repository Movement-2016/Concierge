/* global $ */
import React from 'react';

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
