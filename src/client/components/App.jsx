import React from 'react';
import MediaQuery from 'react-responsive';
import { Provider, connect } from 'react-redux';

import HeaderNav from './HeaderNav.jsx';
import Footer from './Footer.jsx';
import TitleSetter from './TitleSetter.jsx';

import '../lib/polyfills';

import scrollToTop from '../lib/scrollToTop';

import scrollToHash from '../lib/scrollToHash';

const SCROLL_DELAY = 100;

import { SITE_TITLE } from '../../config';

class __App extends React.Component {
  componentDidMount() {
    this.scroll();
  }

  componentDidUpdate() {
    this.scroll();
  }

  scroll() {
    if (this.props.hash) {
      scrollToHash(0, SCROLL_DELAY);
    } else {
      scrollToTop();
    }
  }
  render() {
    const { component, title, browserOnly, headerMenu, footerMenu } = this.props;

    if (browserOnly && global.IS_SERVER_REQUEST) {
      return <p />;
    }

    return (
      <MediaQuery maxWidth={992} values={{ width: 1400 }}>
        {isMobile => {
          return (
            <div className="site-wrapper">
              {title && <TitleSetter title={SITE_TITLE + ' - ' + title} />}
              <HeaderNav menu={headerMenu} siteTitle={SITE_TITLE} mobile={isMobile} />
              {component && React.createElement(component, { mobile: isMobile })}
              <Footer menu={footerMenu}/>
            </div>
          );
        }}
      </MediaQuery>
    );
  }
}

const mapStateToProps = ({
  router: {
    target: {
      routeModel: { component, title },
      browserOnly,
    },
    route: {
      location: { hash },
    },
  },
}) => ({ component, title, browserOnly, hash });

const _App = connect(mapStateToProps)(__App);

const App = ({ store, model: { headerMenu, footerMenu } }) => (
  <Provider store={store}>
    <_App {...{headerMenu, footerMenu}} />
  </Provider>
);

module.exports = App;
