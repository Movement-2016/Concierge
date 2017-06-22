import React from 'react';

import { StoreWatcher } from '../ContextMixins';
import { setVisibility } from '../../store/actions';

class OrgsPage extends StoreWatcher(React.Component) {

  stateFromStore(storeState) {
    const {
      groups: {
        visibility,
        selected: selectedGroups
      }
    } = storeState;
    this.setState( {visibility, selectedGroups} );
  }

  // changes visibility of orgs based on filters checked
  handleFilterToggle = (visibility) => {
    this.context.store.dispatch( setVisibility( visibility ) );
  }

}

module.exports = OrgsPage;
