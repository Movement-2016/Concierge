import React from 'react';

import Item from './Item.jsx';

class Group extends React.Component {

  render() {

    const {
      name,
      label,
      items,
      group
    } = this.props;

    return (
        <div className="state" id={name}>
          <div className={`state-title ${group}`}><h4>{label}</h4></div>
          {items.map( o => <Item key={o.id} {...o} />)}
        </div>
      );
  }
}


module.exports = Group;