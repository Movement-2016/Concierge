import React from 'react';
import TagString from 'tag-string';

import { ContextFromService } from '../ContextMixins';
import { setVisibility } from '../../store/actions';

class OrgsPage extends ContextFromService(React.Component) {

  get servicePropNames() {
    return ['orgs'];
  }

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
