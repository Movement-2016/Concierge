import React    from 'react';
import Link from '../services/LinkToRoute';

const TileBody = ({
      body,
      image,
      label,
      title,
      url,
      category
    }) => 
    /* eslint-disable react/no-danger */
      <div className="tile-body">
        <div className="tile-header" style={image ? { backgroundImage: 'url("' + image + '")' } : {}}>
          {category && <div className="tile-tag">{category}</div>}
          {label && <div className="tile-tag">{label}</div>}
        </div>
        <div className="tile-text">
          <h3 className="tile-title">{title}{url && <i className="material-icons">{'chevron_right'}</i>}</h3>
          <div className="tile-content" dangerouslySetInnerHTML={{__html:body}} />
        </div>
      </div>
;

const Tile = props =>
      <div className={props.display ? `tile ${props.display}` : 'tile'}>
        {props.url
          ? (/^http/.test(props.url)
            ?  <a href={props.url} target="_blank"><TileBody {...props} /></a>
            :  <Link to={props.url}><TileBody {...props} /></Link>
          )
          : <TileBody {...props} />
        }
      </div>
;

module.exports = Tile;
