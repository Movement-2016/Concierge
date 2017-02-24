import React    from 'react';
import { Link } from 'react-router';

class TileBody extends React.Component {
  render() {
    const {
      post_title: title,
      post_content: content,
      fields: {
        category,
        label,
        image,
        url
      }
    } = this.props;

    const tileHeaderStyle = image
      ? { backgroundImage: 'url("' + image + '")' }
      : {};

    return (
      <div className="tile-body">
        <div className="tile-header" style={tileHeaderStyle}>
          {category && <div className="tile-tag">{category}</div>}
          {label && <div className="tile-tag">{label}</div>}
        </div>
        <div className="tile-text">
          <h3 className="tile-title">{title}{url && <i className="material-icons">chevron_right</i>}</h3>
          <div className="tile-content" dangerouslySetInnerHTML={{__html:content}} />
        </div>
      </div>
    );
  }
}

class Tile extends React.Component {

  render() {
    const {
      fields: {
        display,
        url
      }
    } = this.props;

    const isRemote = /^http/.test(url);
    let tileClass = 'tile';
    display && (tileClass += ' ' + display);

    return (
      <div className={tileClass}>
        {url
          ? (isRemote
            ?  <a href={url} target="_blank"><TileBody {...this.props} /></a>
            :  <Link to={url}><TileBody {...this.props} /></Link>
          )
          : <TileBody {...this.props} />
        }
      </div>
    );
  }
}

module.exports = Tile;
