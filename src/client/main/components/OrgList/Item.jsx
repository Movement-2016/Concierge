import React from 'react';

import { 
  ContextMixin 
} from '../ContextMixins';

import { toggleItem } from '../../store/actions';

class Item extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    
    this.state = {
      selected: false
    };
    
    this.onItemClick = this.onItemClick.bind(this);

    this.filters = this.context.store.getState().service.filterDict;
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
      group
    } = this.props;

    const {
      selected
    } = this.state;

    const text = selected ? 'Remove from plan' : 'Add to plan';
    const cls  = selected ? 'selected' : '';

    return(
        <div className={`item ${group} ${cls}`}>
          <div className="name"><span dangerouslySetInnerHTML={{__html:name}} /></div>
          <div className="links-area">
            {urlWeb && <a className="img-link" href={urlWeb} target="_blank" rel="noopener noreferrer"><img src="/images/ic_link_red_24dp.png" alt="" /><span> Website</span></a>}
            {urlGive && <a className="img-link" href={urlGive}><img src="/images/ic_star_border_red_24dp.png" alt="" /><span> Contribute</span></a>}
            <a className="img-link" href="#" onClick={this.onItemClick}><span><span className="glyphicon glyphicon-tasks" /> {text}</span></a>
          </div>
          <div className="org-type-area">
            {tags.map( t => <span key={t}>{this.filters[t]}</span> )}
          </div>
          <div className="description-area" dangerouslySetInnerHTML={{__html:description}} />
        </div>
      );
  }
}

module.exports = Item;