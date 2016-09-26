import React from 'react';

import Org from './Org.jsx';

class State extends React.Component {

  render() {

    const {
      name,
      label,
      items,
      group:color
    } = this.props;

    return (
        <div className="state" id={name}>
          <div className={`state-title ${color}`}><h4>{label}</h4></div>
          {items.map( o => <Org key={o.id} {...o} />)}
        </div>
      );
  }
}


module.exports = State;