import React               from 'react';
import { ServiceContext }  from './ContextMixins.js';
import Tile                from './Tile.jsx';


class DonateTiles extends ServiceContext(React.Component) {

  stateFromStore( storeState ) {

    storeState.service.donateTiles.then( tiles => this.setState( { tiles, loading: false  }));

    this.setState({ loading: true });
  }

  render() {
    const {
      tiles,
      loading
    } = this.state;

    if( loading ) {
      return null;
    }

    return (
      <div className="donate-tiles">
        {tiles.map( (d, i) => <Tile key={i} {...d} />)}
      </div>
    );
  }
}


module.exports = DonateTiles;
