import React from 'react';

import {
  ContextMixin
} from '../ContextMixins';

import { toggleItem }        from '../../store/actions';
import { filterTagsByTypes } from '../../store/utils';

class TagBlock extends React.Component {
  render() {
    const { tagTypes } = this.props;
     return (
        <div>
        {Object.keys(tagTypes).map( (t,i) => {
          const { label, tags } = tagTypes[t];
          if (tags.length === 0) {
            return;
          } else {
            return (
                <div className="tagblock" key={i} >
                  <div className="tagblock-title">{label}:</div>
                  <div className="tagblock-tags">{tags.map( (g,i) => <span className="group-tag" key={i}>{g}</span>)}</div>
                </div>
              );
            }
        })}
        </div>
      );
  }
}

class Org extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);

    this.state = {
      selected: false
    };

    this.onOrgClick = this.onOrgClick.bind(this);

    this.filters = this.context.store.getState().service.filters;

  }

  shouldComponentUpdate() {
    return this.state.selected !== this._isSelected();
  }

  onOrgClick(e) {
    e.preventDefault();
    this.context.store.dispatch( toggleItem(this.props.id) );
  }

  stateFromStore(storeState) {
    if( this.state.selected !== this._isSelected(storeState) ) {
      this.setState( { selected: !this.state.selected });
    }
  }

  _isSelected( storeState ) {
    const { groups } = storeState || this.context.store.getState();
    return groups.selected.includes(this.props.id);
  }

  render() {
    const {
      name,
      urlWeb,
      urlGive,
      description,
      tags,
      id
    } = this.props;

    const {
      selected
    } = this.state;

    const icon = selected ? 'close' : 'playlist_add';
    const iconCls = selected ? 'remove' : 'add';
    const text = selected ? 'Remove from plan' : 'Add to plan';
    const cls  = selected ? 'selected' : '';

    const {
      'nonprofit-type': nonProfitType,
      constituency,
      'issue-area': issueArea
    } = filterTagsByTypes({tags,filters:this.filters});


    return(
        <div className={`group ${cls}`}>
          <div className="group-title" data-id={id}><span data-href={`/groups#${id}`} dangerouslySetInnerHTML={{__html:name}} /></div>
          <div className="group-links-row row">
            <div className="col s6 m9">
              {urlWeb  && <a className="group-link" href={urlWeb}  target="_blank"><i className="material-icons">link</i>Website</a>}
              <a className="group-link hide-on-small-and-down" href="#" onClick={this.onOrgClick}><span><i className={`material-icons ${iconCls}`}>{icon}</i>{text}</span></a>
              {urlGive && <a className="group-link" href={urlGive} target="_blank"><i className="material-icons">star_border</i>Donate Now</a>}
            </div>
            <div className="nonprofit-tags col s6 m3">
              {nonProfitType.tags.map( t => <span className="group-tag" key={t}>{t}</span> )}
            </div>
          </div>
          <div className="group-content"><p dangerouslySetInnerHTML={{__html:description}} /></div>
          <TagBlock tagTypes={{constituency,issueArea}} />
        </div>
      );
  }
}

module.exports = Org;
