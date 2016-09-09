import React               from 'react';
import { Link, IndexLink } from 'react-router';

var NavbarHeader = React.createClass({
  render: function() {
    const { homeLink } = this.props;
    return (
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse" aria-expanded="false">
          <span className="sr-only">{"Toggle navigation"}</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
          </button>
          {homeLink}
        </div>
      );
  }
});

const MENU_SELECTORS = 'nav navbar-nav navbar-right';

const MenuItem = ({href,linkto,text}) => {

  if( href ) {
    return <a href={href}>{text}</a>;
  }

  return <Link to={linkto}>{text}</Link>;
};

const MenuAnonymous = ({store}) => {
  const { content: { mainMenu } } = store.getState().service;

  return (
      <ul className={MENU_SELECTORS}>
        {mainMenu.map( (m,i) => <li key={i}><MenuItem {...m} /></li>)}
      </ul> 
    );
};

class Nav extends React.Component {

  render () {

    const { store } = this.context;

    var homeLink = <IndexLink to="/" className="navbar-brand">Movement 2016</IndexLink>;

    return (
        <nav className="navbar topNavArea">
          <div className="container-fluid">
            <NavbarHeader title="Movement 2016" homeLink={homeLink}/>
            <div className="collapse navbar-collapse" id="nav-collapse">
              <MenuAnonymous store={store}/>
            </div>
          </div>
        </nav>
      );
  }
}

Nav.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

module.exports = Nav;