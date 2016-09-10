import React               from 'react';
import { Link, IndexLink } from 'react-router';

const SITE_TITLE = "Movement 2016";

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

const MenuItem = ({href,linkto,text}) => {

  if( href ) {
    return <a href={href}>{text}</a>;
  }

  return <Link to={linkto}>{text}</Link>;
};

const MenuAnonymous = ({store}) => {
  const { content: { mainMenu } } = store.getState().service;

  return (
      <ul className="nav navbar-nav navbar-right">
        {mainMenu.map( (m,i) => <li key={i}><MenuItem {...m} /></li>)}
      </ul> 
    );
};

class Nav extends React.Component {

  render() {

    const { siteTitle } = this.props;

    const { store } = this.context;

    var homeLink = <IndexLink to="/" className="navbar-brand">{siteTitle}</IndexLink>;

    return (
        <nav className="navbar top-nav-area">
          <div className="container-fluid">
            <NavbarHeader title={siteTitle} homeLink={homeLink}/>
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