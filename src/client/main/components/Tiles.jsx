import React    from 'react';
import { Link } from 'react-router';

const BOOTSTRAP_MAX_COLUMNS = 12;

const Tile = ({ linkto, href, glyph, img, title, text, body, compact }) => {

  const kompact  = compact ? 'compact' : '';

  const icon     = glyph 
                     ? <i className={`glyphicon glyphicon-${glyph} tile-icon tile-glyph`} />
                     : img && <img src={img} className="tile-img tile-glyph" />;

  const iconlink = icon && (linkto
                              ? <Link to={linkto}>{icon}</Link>
                              : href && <a href={href}>{icon}</a>);

  const link     = linkto
                    ? <Link to={linkto} className="btn btn-primary">{text}</Link>
                    : href && <a href={href} className="btn btn-primary">{text}</a>;

  return (
      <div className={`tile ${kompact}`}>
        {title && <div className="tile-title">{title}</div>}
        {iconlink}
        {!iconlink && icon}
        {body && <div className="tile-body" dangerouslySetInnerHTML={{__html:body}} />}
        {link}
      </div>
    );
};

const Row = ({ row, defaultTile = {}, colWidth }) => {
  const cls = `col-md-${colWidth} tiles-parent `;
  return(
      <div className="row tiles-row">{
        row.map( (t,n) => <div className={cls} key={n} ><Tile {...defaultTile} {...t} /></div>)
      }</div>
    );
};

const Tiles = ({ tiles, defaultTile = {}, colsPerRow }) => {

  const numRows = Math.trunc(tiles.length/ colsPerRow) + ((tiles.length % colsPerRow) ? 1 : 0);

  const rows = new Array( numRows )
                  .fill(true)
                  .map( (a,i) => tiles.slice(i*colsPerRow,i*colsPerRow+colsPerRow));

  return(
        <div className="tiles container-fluid" >
          {rows.map( (row,i) =>  <Row key={i} row={row} defaultTile={defaultTile} colWidth={BOOTSTRAP_MAX_COLUMNS/colsPerRow} />)}
        </div>
    );
};

Tiles.MAX_COLUMNS = BOOTSTRAP_MAX_COLUMNS;

module.exports = Tiles;
