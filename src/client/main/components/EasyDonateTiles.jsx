import React       from 'react';
import DonateTiles from './DonateTiles.jsx';

class EasyDonateTile extends React.Component {
  render() {
    const {
      post_title: title,
      post_content: content,
      fields: {
        url
      }
    } = this.props;

    const isRemote = /^http/.test(url);

    if (!isRemote) {
      return null;
    }

    return (
      <div className="donate-tile">
        <div className="tile-title">{title}</div>
        <div className="tile-content">{content}</div>
        <a className="tile-button btn-flat waves-effect waves-light" href={url} target="_blank">Donate Now</a>
      </div>
    );
  }
}

class EasyDonateTiles extends React.Component {

  render() {
    return <DonateTiles tiles={this.props.tiles} title="Easy Donate Options" TileComp={EasyDonateTile} />;
  }
}

module.exports = EasyDonateTiles;
