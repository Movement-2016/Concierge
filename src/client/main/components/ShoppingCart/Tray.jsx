import React     from 'react';
import { Link }  from 'react-router';

import { ContextMixin } from '../ContextMixins';

class Tray extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    this.state = {
      selected: []
    };
  }

  stateFromStore(storeState) {
    const { groups:{ selected } } = storeState;

    this.setState({ selected });
  }

  render() {
    const { selected:{length} } = this.state;

    const s = length !== 1 ? 's' : '';

    return(
        <div className="donation-plan-tray">
          <div className="title">My Donation Plan</div>
          <div className="info">{length} Group{s}</div>
          <div className={'button-area' + (length ? ' open' : '')}>
            <Link to="/plan" className="btn-flat waves-effect waves-light"><i className="material-icons">playlist_add_check</i><span className="button-text">Go to plan</span></Link>
          </div>
        </div>
      );
  }
}

module.exports = Tray;
