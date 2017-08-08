import React           from 'react';
import MediaQuery      from 'react-responsive';
import { Provider }    from 'react-redux';

import { initFilters,
         setModel }    from '../../shared/store/actions/groups';

// TODO: move this
import { setRoute }    from '../../shared/store/actions/router';

import store           from '../../shared/store/';

import Nav             from './Nav.jsx';
import Footer          from './Footer.jsx';
import TitleSetter     from './TitleSetter.jsx';

import '../lib/polyfills';

import scrollToTop from '../lib/scrollToTop';

import { SITE_TITLE } from '../../config';

class App extends React.Component {

  constructor (props) {
    super (props);
    this.renderDisable = false;
    this.state = { ...props };
  }

  componentWillMount() {
    if( !global.IS_SERVER_REQUEST ) {
      const Router = require('../services/router');
      Router.service.on( Router.service.events.NAVIGATE_TO, this.onNavigate.bind(this) );
      store.dispatch( initFilters(this.state.groupFilters) );
    }
  }

  onNavigate(spec) {
    const {
      model,
      params,
      path,
      queryParams
    } = spec;
    store.dispatch( setRoute({model,params,path,queryParams}) );
    this.setState( spec, (document !== undefined) && !document.location.hash && scrollToTop );
  }

  render () {

    const { 
      menu,
      component: { 
        component:comp,
        title
      },
      model, 
      browserOnly,
      params, 
      path,
      queryParams 
    } = this.state;

    if( !path || (browserOnly && global.IS_SERVER_REQUEST) ) {
      return <p />;
    }

    /*
      Every top level component is instantiated with the following props:
        - store       := Redux store
        - param       := /groups/:slug -> { slug: somevalue }
        - queryParams := ?foo=bar&baz=802 -> { foo: 'bar', baz: 802 }
        - model       := prefectched data model per specs in router
        - mobile      := boolean true on small (992px) screens

      UPDATE: these will be migrating into the redux store        
    */

    return (
      <Provider store={store}>
        <MediaQuery maxWidth={992} values={{width: 1400}}>
          {(isMobile) => {
            return (
              <div className="site-wrapper">
                {title && <TitleSetter title={SITE_TITLE + ' - ' + title} />}
                <Nav menu={menu} siteTitle={SITE_TITLE} mobile={isMobile} />
                {comp && React.createElement(comp, { store, model, params, queryParams, mobile: isMobile} )}
                <Footer />
              </div>
            );
          }}
        </MediaQuery>
      </Provider>
    );
  }
}

module.exports = App;
