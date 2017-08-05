import React from 'react';
import Link  from '../services/LinkToRoute';

const BackLink = props => <Link className="back-link" to={props.to} title={props.title}><i className="material-icons">chevron_left</i>{props.children}</Link>;

module.exports = BackLink;
