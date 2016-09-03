import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';

import configureStore        from '../../store/configureStore';
import { verifyLogin }       from '../../account/store/actions';

import Routes      from './Routes.jsx';
import Nav         from './Nav.jsx';
import Thermometer from './Thermometer.jsx';

const store = configureStore ();

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      authenticated: false // store.getState ().user.authenticated,
    };
  }

  // on mount, subscribe to listen for authentication status changes
  componentWillMount () {
    this.unsubscribe = store.subscribe (() => {
      const authenticated = store.getState ().user.authenticated;
      if (this.state.authenticated !== authenticated) {
        this.setState ({ authenticated });
      }
    });
    
    store.dispatch (verifyLogin ());
  }

  // before unmount, remove store listener
  componentWillUnmount () {
    this.unsubscribe ();
  }

  render () {
    return (
      <Provider store={store}>
        <div>
          <Thermometer goal={10000000} pledged={904402} />
          <Nav loggedIn={this.state.authenticated} />
          <div className='mainArea'>
            {this.props.children}
          </div>
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