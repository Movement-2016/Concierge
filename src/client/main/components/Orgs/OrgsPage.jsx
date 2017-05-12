import React from 'react';
import TagString from 'tag-string';

import { ServiceContext } from '../ContextMixins';
import { setVisibility } from '../../store/actions';

class OrgsPage extends ServiceContext(React.Component) {

  get contextPropName() {
    return 'orgs';
  }

  // changes visibility of orgs based on filters checked
  handleFilterToggle = (visibility) => {
    this.context.store.dispatch( setVisibility( visibility ) );
  }

}

module.exports = OrgsPage;
