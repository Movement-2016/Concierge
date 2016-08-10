import React from 'react';
import { Link, IndexLink } from 'react-router';
import { logout } from '../../account/store/actions';

export default class Nav extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      displayWidth: window.innerWidth,
      menuVisible: false,
    };
    this.handleResize = this.handleResize.bind (this);
  }

  componentDidMount () {
    window.addEventListener ('resize', this.handleResize);
  }

  componentWillUnmount () {
    window.removeEventListener ('resize', this.handleResize);
  }

  handleResize () {
    const newState = {
      displayWidth: window.innerWidth,
    };
    if (this.state.menuVisible) {
      newState.menuVisible = false;
    }
    this.setState (newState);
  }

  render () {
    const collapse = (this.state.displayWidth < 768);
    let items;
    if (!(collapse && (this.state.menuVisible === false))) {
      if (this.props.loggedIn) {
        items = (
          <ul>
            <li key='1'>
              <IndexLink to='/' activeClassName='active'>Home</IndexLink>
            </li>
            <li key='2'>
              <Link to='/plan' activeClassName='active'>Plan Your Contributions</Link>
            </li>
            <li key='3'>
              <Link to='/aboutus' activeClassName='active'>About Us</Link>
            </li>
            <li key='4'>
              <Link to='/getintouch' activeClassName='active'>Get In Touch</Link>
            </li>
            <li
              key='7'
              onClick={() => {
                this.context.store.dispatch (logout ());
              }}
            >
              <Link to='/'>Logout</Link>
            </li>
          </ul>
        );
      } else {
        items = (
          <ul>
            <li key='1'>
              <IndexLink to='/' activeClassName='active'>Home</IndexLink>
            </li>
            <li key='3'>
              <Link to='/aboutus' activeClassName='active'>About Us</Link>
            </li>
            <li key='4'>
              <Link to='/getintouch' activeClassName='active'>Get In Touch</Link>
            </li>
            <li key='5'>
              <Link to='/signup' activeClassName='active'>Sign up</Link>
            </li>
            <li key='6'>
              <Link to='/login' activeClassName='active'>Login</Link>
            </li>
            <li key='999'>
              <Link to='/staff' activeClassName='active'>Staff</Link>
            </li>
          </ul>
        );
      }
    }

    if (collapse) {
      return (
        <div id='header' className='header'>
          <div className='headerContent'>
            <img
              className='navIcon'
              src='/images/ic_menu_black_24dp.png'
              alt=''
              onClick={() => {
                this.setState ({ menuVisible: !this.state.menuVisible });
              }}
            />
            {this.state.menuVisible === false ? null :
              <nav onClick={() => { this.setState ({ menuVisible: false }); }}>
                <div>
                  {items}
                </div>
              </nav>
            }
            <h1>Movement 2016</h1>
          </div>
        </div>
      );
    } else {
      return (
        <div id='header' className='header'>
          <div className='headerContent'>
            <h1>Movement 2016</h1>
            <nav className='navMenu'>
              {items}
            </nav>
          </div>
        </div>
      );
    }
  }
}

Nav.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
};

Nav.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
