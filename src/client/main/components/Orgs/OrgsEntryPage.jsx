import React from 'react';

import router from '../../../../shared/router';

import OrgsMenuPage from './OrgsMenuPage.jsx';
import OrgsPageDesktop from './OrgsPageDesktop.jsx';
import OrgsPageMobile from './OrgsPageMobile.jsx';

class OrgsEntryPage extends React.Component {

  // Redirect mobile state or color-group groups page to desktop groups page
  componentWillMount() {
    if( !global.IS_SERVER_REQUEST ) {
      const { params, mobile } = this.props;
      if (params && params.slug && !mobile) {
        router.navigateTo('/groups#' + params.slug);
      }      
    }
  }

  render() {
    const props = this.props;

    const { params, mobile } = props;

    if (mobile) {
      return (params && params.slug)
        ? <OrgsPageMobile {...props} pageSlug={params.slug} />
        : <OrgsMenuPage {...props} />;
    }

    return <OrgsPageDesktop {...props} />;
  }
}

module.exports = OrgsEntryPage;
