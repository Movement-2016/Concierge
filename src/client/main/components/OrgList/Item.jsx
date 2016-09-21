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
          return (
              <div className="tagblock" key={i} >
                <div className="tagblock-title">{label}</div>
                <div className="tagblock-tags">{tags.map( (g,i) => <span key={i}>{g}</span>)}</div>
              </div>
            );
        })}
        </div>
      );
  }
}

class Item extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    
    this.state = {
      selected: false
    };
    
    this.onItemClick = this.onItemClick.bind(this);

    this.filters = this.context.store.getState().service.filters;

  }

  shouldComponentUpdate() {
    return this.state.selected !== this._isSelected();
  }
  
  onItemClick(e) {
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

    const text = selected ? 'Remove from plan' : 'Add to plan';
    const cls  = selected ? 'selected' : '';

    const {
      'nonprofit-type': nonProfitType,
      constituency,
      'issue-area': issueArea
    } = filterTagsByTypes({tags,filters:this.filters});
    

    return(
        <div className={`group ${cls}`}>
          <h5 className="group-title" data-id={id}><a href={`/groups#${id}`} dangerouslySetInnerHTML={{__html:name}} /></h5>        
          <div className="row">
            <div className="links-col col s12 m8">
              {urlWeb  && <a className="group-link" href={urlWeb}  target="_blank"><i className="material-icons">link</i>Website</a>}
              {urlGive && <a className="group-link" href={urlGive} target="_blank"><i className="material-icons">star_border</i>Contribute</a>}
              <a className="group-link" href="#" onClick={this.onItemClick}><span><i className="material-icons">toc</i> {text}</span></a>
            </div>
            <div className="nonprofit-tags col s12 m4">
              {nonProfitType.tags.map( t => <span key={t}>{t}</span> )}
            </div>
          </div>
          <div className="group-content"><p dangerouslySetInnerHTML={{__html:description}} /></div>
          <TagBlock tagTypes={{constituency,issueArea}} />
        </div>
      );
  }
}

module.exports = Item;