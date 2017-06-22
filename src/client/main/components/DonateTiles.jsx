import React    from 'react';
import Tile     from './Tile.jsx';


class DonateTiles extends React.Component {

  render() {

    const {
      TileComp = Tile,
      title = ''
    } = this.props;

    return (
      <div className="donate-tiles">
        {title && (<div className="title">{title}</div>)}
        {this.props.tiles.map( (d, i) => <TileComp key={i} {...d} />)}
      </div>
    );
  }
}


module.exports = DonateTiles;
