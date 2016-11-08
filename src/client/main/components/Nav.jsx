import React               from 'react';
import { Link, IndexLink } from 'react-router';

const _MenuItem = ({href,linkto,text} ) => {
  if( href ) {
    return <li className="top-level"><a href={href}>{text}</a></li>;
  }

  return <li><Link to={linkto}>{text}</Link></li>;
};

const MenuDropDown = ({menu,text}) => {
  const href1 = menu[0].href;
  return (
    <li className="drop-down-btn" >
      <a href={href1}>{text}<i className="material-icons">arrow_drop_down</i></a>
        <ul className="drop-down">
          {menu.map( (m,i) => <_MenuItem key={i} {...m} />)}
        </ul>
      </li>
      );
};

const MenuItem = ({href,linkto,menu,text}) => {

  return menu
      ? <MenuDropDown text={text} menu={menu} />
      : <_MenuItem href={href} linkto={linkto} text={text} />;
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

    state.service.content.then( content => this.setState({content,loading: false}) );
  }

  render() {
    const {
      loading,
      content: {
        mainMenu = []
      } = {}
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
          {mainMenu.map( (m,i) => <MenuItem key={i} {...m} />)}
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
        draggable: true
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
          <div className="nav-wrapper">
            <IndexLink to="/" className="brand-logo">{siteTitle}</IndexLink>
            <MenuAnonymous className="right hide-on-med-and-down" store={store}/>
            <MenuAnonymous className="side-nav" id="mobile-menu" store={store} />
            <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
          </div>
        </nav>
      </div>
      );
  }
}


module.exports = Nav;