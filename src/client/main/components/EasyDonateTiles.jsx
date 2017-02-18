import React               from 'react';
import { ServiceContext }  from './ContextMixins.js';
import Tile                from './Tile.jsx';


class EasyDonateTile extends React.Component {
  render() {
    const {
      post_title: title,
      post_content: content,
      fields: {
        display,
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

class EasyDonateTiles extends ServiceContext(React.Component) {

  get contextPropName() {
    return 'donateTiles';
  }

  render() {
    const {
      donateTiles,
      loading
    } = this.state;

    if( loading ) {
      return null;
    }

    return (
      <div className="donate-tiles">
        <div className="title">Easy Donate Options</div>
        {donateTiles.map( (d, i) => <EasyDonateTile key={i} {...d} />)}
      </div>
    );
  }
}


module.exports = EasyDonateTiles;
