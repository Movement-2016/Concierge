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
        <div className="group" id="name">
          <a name={name} />
          <h3 className={group}>{label}</h3>
          {items.map( o => <Item key={o.id} {...o} />)}
        </div>
      );
  }
}


module.exports = Group;