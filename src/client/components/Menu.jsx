import React from 'react';
import Login from './Profile/Login.jsx';

import idFormat from '../lib/helperFunctions';
import Link from '../services/LinkToRoute';
import { ENABLE_LOGIN } from '../../config';

const _MenuItem = ({ url, label }) => {
  var isExternal = global.IS_SERVER_REQUEST || url.includes('http');
  return isExternal ? (
    <li id={'menu-item-' + idFormat(label)} className="menu-item">
      <a href={url}>{label}</a>
    </li>
  ) : (
    <li id={'menu-item-' + idFormat(label)} className="menu-item">
      <Link to={url}>{label}</Link>
    </li>
  );
};

const SubMenu = ({ url, children, label }) => (
  <li id={'menu-item-' + idFormat(label)} className="menu-parent">
    <Link to={url}>{label}</Link>
    <ul className="menu-children">
      {children.map((m, i) => <_MenuItem key={i} {...m} />)}
    </ul>
  </li>
);

const MenuItem = ({ url, children = [], label }) => (
  children.length
    ? <SubMenu url={url} label={label} children={children} />
    : <_MenuItem url={url} label={label} />
);

const Menu = ({ menu, className, id='' }) => (
  <ul className={className} id={id}>
    {id === 'mobile-menu' && (
      <div className="top-bar">
        <a className="close-button">
          <i className="material-icons">{'close'}</i>
        </a>
      </div>
    )}
    {menu.map((m, i) => <MenuItem key={i} {...m} />)}
    {ENABLE_LOGIN && <li><Login /></li>}
  </ul>
);

module.exports = Menu;
