import React               from 'react';
import { ServiceContext }  from './ContextMixins.js';
import Tile                from './Tile.jsx';


class DonateTiles extends ServiceContext(React.Component) {

  get contextPropName() {
    return 'donateTiles';
  }

  render() {
    const {
      donateTiles,
      loading
    } = this.state;

    if( loading ) {
      return null;
    }

    return (
      <div className="donate-tiles">
        {donateTiles.map( (d, i) => <Tile key={i} {...d} />)}
      </div>
    );
  }
}


module.exports = DonateTiles;
