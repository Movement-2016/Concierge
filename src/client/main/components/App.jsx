import React              from 'react';
import { render }         from 'react-dom';
import { Provider }       from 'react-redux';

import '../../lib/polyfills';

import { initFilters }       from '../store/actions';

import configureStore        from '../../store/configureStore';

import service               from '../../../shared/m-service';

import {
  unsubscribeFromStore,
  subscribeToStore
} from '../../lib/analytics';

import Router       from './Routes.jsx';
import Nav          from './Nav.jsx';
import Footer       from './Footer.jsx';
import Loading      from './Loading.jsx';

const store = configureStore ();

const SITE_TITLE = 'Movement 2017';

const ErrorPage = ({ error, err }) => {
    const msg = error.toString();
    let   msg2 = err.toString();
    (msg2 === msg) && (msg2 = '');
    return (<div className="error-page">
      <h3>There was a problem</h3>
      <pre>{msg}</pre>
      <pre>{msg2}</pre>
    </div>);
  };

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      menu: props.menu,
      loading: !global.IS_SERVER_REQUEST,
      error: '',
      err: ''
    };
  }

  componentWillMount () {

    const { initService } = service.actions;

    store.dispatch( initService(service) );
    if( !this.state.loading ) {
      return;
    }
    
    service.filters.then( filters => {

      store.dispatch( initFilters(filters) );
      subscribeToStore(store);

      return service.menu;
    }).then( menu => {

      const TIMING_DELAY = 250;

      setTimeout( () => this.setState({ menu, loading: false }), TIMING_DELAY );

    }).catch( error => {
      var err = err.message || err.statusText || err + '';      
      this.setState( { error, err } );
    });
  }

  // before unmount, remove store listener
  componentWillUnmount () {
    unsubscribeFromStore();
  }

  render () {
    if( this.state.loading ) {
      return <Loading />;
    }

    const {
      err,
      error,
      menu
    } = this.state;

    if( error ) {
      return <ErrorPage error={error} err={err} />;
    }

    return (
      <Provider store={store}>
        <div className="site-wrapper">
          <Nav menu={menu} siteTitle={SITE_TITLE} />
          {this.props.children}
          <Footer />
        </div>
      </Provider>
    );
  }
}

App.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.node,
};

if( !global.IS_SERVER_REQUEST ) {
  render( <Router App={App} store={store} />, document.getElementById('app') );  
}

module.exports = App;
