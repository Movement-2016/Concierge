import React              from 'react';
import { Provider }       from 'react-redux';
import MediaQuery         from 'react-responsive';

import '../../lib/polyfills';

import { initFilters }       from '../store/actions';

import configureStore        from '../../store/configureStore';

import router                from '../../../shared/router'; 

import {
  unsubscribeFromStore,
  subscribeToStore
} from '../../lib/analytics';

import Nav             from './Nav.jsx';
import Footer          from './Footer.jsx';

import appBrowserModel from './AppBrowserModel';

const store = configureStore();

const SITE_TITLE = 'Movement 2017';

// const ErrorPage = ({ error, err }) => {
//     const msg = error.toString();
//     let   msg2 = err.toString();
//     (msg2 === msg) && (msg2 = '');
//     return (<div className="error-page">
//       <h3>There was a problem</h3>
//       <pre>{msg}</pre>
//       <pre>{msg2}</pre>
//     </div>);
//   };


class App extends React.Component {

  constructor (props) {
    super (props);
    this.onNavigate = this.onNavigate.bind(this);
    this.state = { ...props };
  }

  componentWillMount() {
    if( !global.IS_SERVER_REQUEST ) {
      router.on( router.events.NAVIGATE_TO, this.onNavigate );
      store.dispatch( initFilters(this.state.groupFilters) );
      subscribeToStore(store);    
    }
  }

  componentWillUnmount () {
    unsubscribeFromStore();
  }

  onNavigate(spec) {
    this.setState( spec );
  }

  render () {

    const { 
      menu,
      component: { 
        component:comp 
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

    return (
      <Provider store={store}>
        <MediaQuery maxWidth={992} values={{width: 1400}}>
          {(matches) => {
            // add additional mobile prop to child element
            return (
              <div className="site-wrapper">
                <Nav menu={menu} siteTitle={SITE_TITLE} mobile={matches} />
                {comp && React.createElement(comp, { store, model, params, queryParams, mobile: matches} )}
                <Footer />
              </div>
            );
          }}
        </MediaQuery>
      </Provider>
    );
  }
}

appBrowserModel(App);

module.exports = App;
