import React    from 'react';
import { Link } from 'react-router';

const Tile = ({ linkto, href, glyph, img, title, text, body, compact }) => {

  const kompact  = compact ? 'compact' : '';

  const icon     = glyph 
                     ? <i className={`glyphicon glyphicon-${glyph} tile-icon tile-glyph`} />
                     : img && <img src={img} className="tile-img tile-glyph" />;

  const iconlink = icon && (linkto
                              ? <Link to={linkto}>{icon}</Link>
                              : <a href={href}>{icon}</a>);

  const link     = linkto
                    ? <Link to={linkto} className="btn btn-primary">{text}</Link>
                    : <a href={href} className="btn btn-primary">{text}</a>;

  return (
      <div className={`tile ${kompact}`}>
        {title && <div className="tile-title">{title}</div>}
        {iconlink}
        {body && <div className="tile-body">{body}</div>}
        {link}
      </div>
    );
};

const Row = ({ row, defaultTile, colWidth, offset }) => {
  const cls = `col-md-${colWidth} tiles-parent `;
  return(
      <div className="row tiles-row">{
        row.map( (t,n) => <div className={cls + (!n && 'col-md-offset-'+offset)} key={n} ><Tile {...defaultTile} {...t} /></div>)
      }</div>
    );
};

const Tiles = ({ tiles, defaultTile, colsPerRow, colWidth, offset }) => {
  var rows = new Array( Math.trunc(tiles.length/ colsPerRow) + ((tiles.length % colsPerRow) & 1) )
                  .fill(true)
                  .map( (a,i) => tiles.slice(i*colsPerRow,i*colsPerRow+colsPerRow));
  return(
        <div className="tiles container-fluid" >
          {rows.map( (row,i) =>  <Row key={i} row={row} defaultTile={defaultTile} colWidth={colWidth} offset={offset}/>)};
        </div>
    );
};

module.exports = Tiles;
