import React               from 'react';
import { Link, IndexLink } from 'react-router';

import { logout } from '../../account/store/actions';

var NavbarHeader = React.createClass({
  render: function() {
    var HomeLink = this.props.homeLink;
    return (
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse" aria-expanded="false">
          <span className="sr-only">{"Toggle navigation"}</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
          </button>
          {HomeLink}
        </div>
      );
  }
});

const MENU_SELECTORS = 'nav navbar-nav navbar-right';

const MenuAnonymous = () => {
  return (
      <ul className={MENU_SELECTORS}>
        <li><Link to='/signup' activeClassName='active'>Sign up</Link></li>
        <li><Link to='/login' activeClassName='active'>Login</Link></li>
        <li><Link to='/staff' activeClassName='active'>Staff</Link></li>
      </ul> 
    );
};

const MenuLoggedIn = props => {
  return (
    <ul className={MENU_SELECTORS}>
      <li onClick={() => { props.store.dispatch (logout ()); }} ><Link to='/'>Logout</Link></li>
    </ul>
  );
};

class Nav extends React.Component {

  render () {

    const { loggedIn } = this.props;
    const { store }    = this.context;

    var homeLink = <IndexLink to="/" className="navbar-brand">Movement 2016</IndexLink>;

    return (
        <nav className="navbar">
          <div className="container-fluid">
            <NavbarHeader title="Movement 2016" homeLink={homeLink}/>
            <div className="collapse navbar-collapse" id="nav-collapse">
              {loggedIn
                ? <MenuLoggedIn store={store} />
                : <MenuAnonymous />
              }
            </div>
          </div>
        </nav>
      );
  }
}

Nav.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
};

Nav.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

module.exports = Nav;