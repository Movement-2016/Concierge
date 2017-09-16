import React       from 'react';
import DonateTiles from './DonateTiles.jsx';

const EasyDonateTile = ({
      title,
      body,
      url
    }) => 
        /^http/.test(url)
          ?  <div className="donate-tile">
              <div className="tile-title">{title}</div>
              <div className="tile-content">{body}</div>
              <a className="tile-button btn-flat waves-effect waves-light" href={url} target="_blank">{'Donate Now'}</a>
            </div>
          : <span style={{display:'none'}} />;

const EasyDonateTiles = ({tiles}) => <DonateTiles tiles={tiles} title="Easy Donate Options" TileComp={EasyDonateTile} />;


module.exports = EasyDonateTiles;
