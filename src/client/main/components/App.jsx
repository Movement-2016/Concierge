import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';

import configureStore        from '../../store/configureStore';

import { verifyLogin }       from '../../account/store/actions';
import { initService }       from '../../m2016-service/actions';

import service               from '../../m2016-service';

import Routes      from './Routes.jsx';
import Nav         from './Nav.jsx';
import Thermometer from './Thermometer.jsx';
import Footer      from './Footer.jsx';

const store = configureStore ();

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

      this.unsubscribe = store.subscribe (() => {
        const authenticated = store.getState ().user.authenticated;
        if (this.state.authenticated !== authenticated) {
          this.setState ({ authenticated });
        }
      });

      this.setState({ 
        loading: false,
        donateStats: service.donateStats,
        authenticated: store.getState ().user.authenticated,
      });
    });
    
    store.dispatch (verifyLogin ());
  }

  // before unmount, remove store listener
  componentWillUnmount () {
    this.unsubscribe ();
  }

  render () {
    if( this.state.loading ) {
      return <div className="well loading">Loading...</div>;
    }

    const { goal, pledged } = this.state.donateStats;

    return (
      <Provider store={store}>
        <div>
          <Thermometer goal={goal} pledged={pledged} />
          <Nav loggedIn={this.state.authenticated} isAdmin />
          <div className='mainArea'>
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