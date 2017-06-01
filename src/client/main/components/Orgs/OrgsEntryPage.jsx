import React from 'react';
import { browserHistory } from 'react-router';


import OrgsMenuPage from './OrgsMenuPage.jsx';
import OrgsPageDesktop from './OrgsPageDesktop.jsx';
import OrgsPageMobile from './OrgsPageMobile.jsx';

class OrgsEntryPage extends React.Component {

  // Redirect mobile state or color-group groups page to desktop groups page
  componentWillMount() {
    const { params, mobile } = this.props;
    if (params && params.slug && !mobile) {
      browserHistory.push('/groups#' + params.slug);
    }
  }

  render() {
    const { params, mobile } = this.props;

    if (mobile) {
      return (params && params.slug)
        ? <OrgsPageMobile pageSlug={params.slug} />
        : <OrgsMenuPage />
    }

    return <OrgsPageDesktop />;
  }
}

module.exports = OrgsEntryPage;
