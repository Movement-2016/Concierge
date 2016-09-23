import React     from 'react';
import { Link }  from 'react-router';

import { ContextMixin } from '../ContextMixins';

class Tray extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    this.id = 'shopping-cart-tray';
    this.hashId = '#' + this.id;
    this.state = {
      selected: []
    };
  }

  componentDidMount() {
    const { selected:{length}, selected } = this.state;
    !length && this._closeTray();
    length && this._openTray(selected);
  }
  
  stateFromStore(storeState) {
    const { groups:{ selected } } = storeState;

    if( selected.length ) {
      this._openTray(selected);
    } else {
      open && this._closeTray();
    }
  }

  _openTray(selected) {
    /* globals $ */
      $(this.hashId).fadeIn().animate( { height: 80 }, () => this.setState({ selected }) );    
    }

  _closeTray() {
    $(this.hashId).fadeOut();
  }

  render() {
    const { selected = [] } = this.state;

    const s = selected.length !== 1 ? 's' : '';

    return(
        <div className="shopping-cart-tray" id={this.id}>
          <div className="info">{`You have selected ${selected.length} organization${s} for your donation plan.`}</div>
          <Link to="/plan" className="btn btn-success">Go to plan</Link>
        </div>
      );
  }
}

module.exports = Tray;
