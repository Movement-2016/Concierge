import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';

import '../../lib/polyfills';

import configureStore        from '../../store/configureStore';

import { initService }       from '../../m2016-service/actions';
import { initFilters }       from '../store/actions';

import service               from '../../m2016-service';

import Routes      from './Routes.jsx';
import Nav         from './Nav.jsx';
import Thermometer from './Thermometer.jsx';
import Footer      from './Footer.jsx';
import Loading     from './Loading.jsx';

const store = configureStore ();

const SITE_TITLE = 'Movement 2016';

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {      
      loading: true
    };
  }

  // on mount, subscribe to listen for authentication status changes
  componentWillMount () {
    service.init().then( service => {

      store.dispatch( initService(service) );
      store.dispatch( initFilters(service.filters) );

      this.unsubscribe = store.subscribe (() => {
        const authenticated = store.getState ().user.authenticated;
        if (this.state.authenticated !== authenticated) {
          this.setState ({ authenticated });
        }
      });

      this.setState({ 
        loading: false,
        donateStats: service.donateStats
      });
    });    
  }

  // before unmount, remove store listener
  componentWillUnmount () {
    this.unsubscribe ();
  }

  render () {
    if( this.state.loading ) {
      return <Loading />;
    }

    const { goal, pledged } = this.state.donateStats;

    return (
      <Provider store={store}>
        <div className="site-wrapper">
          <Thermometer goal={goal} pledged={pledged} />
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