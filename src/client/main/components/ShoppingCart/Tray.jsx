import React     from 'react';
import { Link }  from 'react-router';

import { ContextMixin } from '../ContextMixins';

class Tray extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    this.state = {
      open: false
    };
    this.id = 'shopping-cart-tray';
    this.hashId = '#' + this.id;
  }

  componentDidMount() {
    this._closeTray();
  }
  
  stateFromStore(storeState) {
    const { groups:{ selected } } = storeState;

    if( selected.length ) {
      /* globals $ */
      $(this.hashId).animate( { height: 80 }, () => this.setState({ open: true, selected }) );
    } else {
      open && this._closeTray();
    }
  }

  _closeTray() {
    $(this.hashId).animate( { height: 0 }, () => this.setState({ open: false }) );
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
