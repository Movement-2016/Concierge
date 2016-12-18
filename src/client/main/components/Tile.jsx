import React    from 'react';
import { Link } from 'react-router';

class TileBody extends React.Component {
  render() {
    const {
      image,
      tag,
      title,
      content,
      readMore,
    } = this.props;

    const tileHeaderStyle = image
      ? { background: 'url("' + image + '")' }
      : {}

    return (
      <div className="tile-body">
        <div className="tile-header" style={tileHeaderStyle}>
          {tag && <div className="tile-tag">{tag}</div>}
        </div>
        <div className="tile-text">
          <h3 className="tile-title">{title}</h3>
          <div className="tile-content">{content}</div>
          {readMore && <div className="read-more">Read More<i className="material-icons">chevron_right</i></div>}
        </div>
      </div>
    );
  }
}

class Tile extends React.Component {

  render() {
    const {
      url,
      display,
    } = this.props;

    const isRemote = /^http/.test(url);

    return (
      <div className={'tile ' + display}>
        {isRemote
          ?  <a href={url}><TileBody {...this.props} /></a>
          :  <Link to={url}><TileBody {...this.props} /></Link>
        }
      </div>
    );
  }
}

module.exports = Tile;
