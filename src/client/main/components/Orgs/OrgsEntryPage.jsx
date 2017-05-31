import React from 'react';

import OrgsMenuPage from './OrgsMenuPage.jsx';
import OrgsPageDesktop from './OrgsPageDesktop.jsx';

class OrgsEntryPage extends React.Component {
  render() {
    return (
      this.props.mobile
        ? <OrgsMenuPage />
        : <OrgsPageDesktop />
    );
  }
}

module.exports = OrgsEntryPage;
