import React from 'react';
import { connect } from 'react-redux';

import Link            from '../../services/LinkToRoute';
import OrgsMenuPage    from './OrgsMenuPage.jsx';
import OrgsPageDesktop from './OrgsPageDesktop.jsx';
import OrgsPageMobile  from './OrgsPageMobile.jsx';

class _OrgsEntryPage extends React.Component {

  // Redirect mobile state or color-group groups page to desktop groups page

  componentWillMount() {
    if( !global.IS_SERVER_REQUEST ) {
      const { slug, mobile } = this.props;
      if (slug && !mobile) {
        Link.navigateTo('/groups#' + slug);
      }      
    }
  }

  render() {
    const props = this.props;

    const { slug, mobile } = props;

    if (mobile) {
      return slug
        ? <OrgsPageMobile {...props} />
        : <OrgsMenuPage {...props} />;
    }

    return <OrgsPageDesktop {...props} />;
  }
}

const mapStateToProps = ({ 
        router: {
          navigating,
          route: {
            params: {
              slug = ''
            } = {}            
          }
        }
      }) => ({ slug, navigating });

const OrgsEntryPage = connect(mapStateToProps)(_OrgsEntryPage);

module.exports = OrgsEntryPage;
