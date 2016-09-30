import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';

import '../../lib/polyfills';

import configureStore        from '../../store/configureStore';

import { initService }       from '../../m2016-service/actions';
import { initFilters }       from '../store/actions';

import service               from '../../m2016-service';

import {  
  unsubscribeFromStore,
  subscribeToStore
} from '../../lib/analytics';

import Routes       from './Routes.jsx';
import Nav          from './Nav.jsx';
import DonateHeader from './DonateHeader.jsx';
import Footer       from './Footer.jsx';
import Loading      from './Loading.jsx';

const store = configureStore ();

const SITE_TITLE = 'Movement 2016';

/*
      <ul><li><pre>{error}</pre></li>
          <li><pre>{err}</pre></li></ul>
*/

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
      loading: true,
      error: '',
      err: ''
    };
  }

  componentWillMount () {
    service.init().then( service => {

      // ORDER DEPENDENT!!
      store.dispatch( initService(service) );
      store.dispatch( initFilters(service.filters) );      
      subscribeToStore(store);

      service.donateStats.then( donateStats => this.setState({ loading: false, donateStats }));

    }).catch( err => {
        this.setState({ error: err.message || err.statusText || err + '', err, loading: false });
      });    
  }

  // before unmount, remove store listener
  componentWillUnmount () {
    this.unsubscribe ();
    unsubscribeFromStore();
  }

  render () {
    if( this.state.loading ) {
      return <Loading />;
    }

    const { 
      donateStats: {
        goal,
        pledged
      } = {},
      err,
      error
    } = this.state;

    if( error ) {
      return <ErrorPage error={error} err={err} />;
    }

    return (
      <Provider store={store}>
        <div className="site-wrapper">
          <DonateHeader goal={goal} pledged={pledged} />
          <Nav siteTitle={SITE_TITLE} />
          <div className='main-area'>
            {this.props.children}
          </div>
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

render( <Routes App={App} store={store} />, document.getElementById('app') );

module.exports = App;