import React               from 'react';
import { ContextFromService }  from './ContextMixins';
import Tile                from './Tile.jsx';


class DonateTiles extends ContextFromService(React.Component) {

  get servicePropNames() {
    return ['donateTiles'];
  }

  render() {
    const {
      donateTiles,
      loading
    } = this.state;

    if( loading ) {
      return null;
    }

    const {
      TileComp = Tile,
      title = ''
    } = this.props;

    return (
      <div className="donate-tiles">
        {title && (<div className="title">{title}</div>)}
        {donateTiles.map( (d, i) => <TileComp key={i} {...d} />)}
      </div>
    );
  }
}


module.exports = DonateTiles;
