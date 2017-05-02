import React from 'react';
import OrgsListMobile from './OrgListMobile.jsx';
import OrgsListDesktop from './OrgListDesktop.jsx';

class OrgList extends React.Component {
  render() {
    const { mobile } = this.props;
    return mobile
        ? <OrgsListMobile {...this.props} />
        : <OrgsListDesktop {...this.props} />;
  }
}
module.exports = OrgList;
