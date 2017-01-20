import React from 'react';

import {
  ContextMixin
} from '../ContextMixins';

import { toggleItem } from '../../store/actions';

class TagBlock extends React.Component {
  render() {
    const { 
      fields,
      filters
    } = this.props;

    const block = {};

    ['issue-area','constituency'].forEach( taxonomySlug => {
          if( fields[taxonomySlug] && fields[taxonomySlug].length ) {
            const taxonomy = filters[taxonomySlug];
            const terms     = taxonomy.terms;
            block[taxonomy.label] = fields[taxonomySlug].map( slug => terms[slug].name );
          }
      });

    return (
      <div>
      {Object.keys(block).map( label => { 
          return (
              <div className="tagblock" key={label} >
                <div className="tagblock-title">{label}:</div>
                <div className="tagblock-tags">{block[label].map( (g,i) => <span className="group-tag" key={i}>{g}</span>)}</div>
              </div>
            );
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

    const service = this.context.store.getState().service; 
    this.filters = service.filtersSync;
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
      post_title: name,
      fields,
      fields: {
        website: urlWeb,
        c4_donate_link: urlC4,
        c3_donate_link: urlC3,
        html: description,
        'nonprofit-type': npTags = []
      },      
      ID: id
    } = this.props;

    const {
      selected
    } = this.state;

    const icon    = selected ? 'close' : 'playlist_add';
    const iconCls = selected ? 'remove' : 'add';
    const text    = selected ? 'Remove from plan' : 'Add to plan';
    const cls     = selected ? 'selected' : '';

    const npTerms = this.filters['nonprofit-type'].terms;

    const urlGive = urlC3 || urlC4;
    
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
              {npTags.map( t => <span className="group-tag" key={t}>{npTerms[t].name}</span> )}
            </div>
          </div>
          <div className="group-content"><p dangerouslySetInnerHTML={{__html:description}} /></div>
          <TagBlock fields={fields} filters={this.filters} />
        </div>
      );
  }
}

module.exports = Org;
