import React               from 'react';
import { Link, IndexLink } from 'react-router';

const _MenuItem = ({url,title} ) => {
  var text       = title;
  var isExternal = !!url.match(/^http/);
  var href       = isExternal && url;
  var linkto     = !isExternal && url;

  return href
    ? <li className="top-level"><a href={href}>{text}</a></li>
    : <li><Link to={linkto}>{text}</Link></li>;
};

const MenuDropDown = ({menu,title}) => {
  const text = title;
  const href1 = menu[0].url;
  return (
    <li className="drop-down-btn" >
      <a href={href1}>{text}<i className="material-icons">arrow_drop_down</i></a>
        <ul className="drop-down">
          {menu.map( (m,i) => <_MenuItem key={i} {...m} />)}
        </ul>
      </li>
    );
};

const MenuItem = ({url,children,title}) => {

  return children.length
      ? <MenuDropDown title={title} menu={children} />
      : <_MenuItem url={url} title={title} />;
};

class MenuAnonymous extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    const {store} = this.props;

    const state = store.getState();

    state.service.menu.then( menu => this.setState({menu,loading: false}) );
  }

  render() {
    const {
      loading,
      menu
    } = this.state;

    if( loading) {
      return null;
    }

    const {
      className,
      id
    } = this.props;

    return (
        <ul className={className} id={id}>
          {menu.map( (m,i) => <MenuItem key={i} {...m} />)}
        </ul>
      );
  }
}

class Nav extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    /* global $ */
    var timeoutID = window.setTimeout(slowTest, 10);
    function slowTest() {
      $('.button-collapse').sideNav({
        closeOnClick: true,
      });
    }
  }

  render() {

    const { siteTitle } = this.props;

    const { store } = this.context;

    return (
      <div className="navbar-fixed">
        {this.dropdowns}
        <nav>
          <IndexLink to="/" className="brand-logo">{siteTitle}</IndexLink>
          {/* <IndexLink to="/" className="brand-logo"><img src="/images/movement-logo.png" /></IndexLink> */}
          <MenuAnonymous className="right hide-on-med-and-down" store={store}/>
          <MenuAnonymous className="side-nav" id="mobile-menu" store={store} />
          <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
        </nav>
      </div>
      );
  }
}


module.exports = Nav;
