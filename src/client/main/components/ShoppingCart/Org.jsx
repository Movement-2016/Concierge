import React     from 'react';

import { 
  addPlanItem,
  toggleItem 
} from '../../store/actions';

import { filterTagsByTypes } from '../../store/utils';


import {
  selectPrevElement,
  selectNextElement
} from '../../../ui/util';

const KEY_ARROW_UP = 38;
const KEY_ARROW_DOWN = 40;


class Org extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor() {
    super(...arguments);
    const { filters, tags } = this.props;
    const types = filterTagsByTypes({filters,tags});
    this.tags = types['nonprofit-type'].tags;

    this.state = { value: this.props.amount || '' };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onRemoveOrg = this.onRemoveOrg.bind(this);
  }

  onChange(e) {
    let { target:{value} } = e;
    value = value.replace(/[^0-9]/g,'');
    const { id } = this.props;
    this.context.store.dispatch( addPlanItem(id,value || 0) );
    this.setState({ value });
  }

  onKeyDown(e) {
    var sel = '.' + Org.INPUT_SELECTOR;
    if( e.keyCode === KEY_ARROW_DOWN ) {
      selectPrevElement(sel);
    } else if( e.keyCode === KEY_ARROW_UP ) {
      selectNextElement(sel);
    }
  }

  onRemoveOrg(e) {
    e.preventDefault();
    this.context.store.dispatch( toggleItem(this.props.id) );
  }

  render() {

    const {
      name
    } = this.props;    

    const {
      value
    } = this.state;

    const inProps = {
      type: 'text',
      className: Org.INPUT_SELECTOR,
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    };

    return(
      <div className="group">
        <div className="row">
          <div className="col s8 m9">
            <div className="group-title" dangerouslySetInnerHTML={{__html:name}} />
            <div className="nonprofit-tags">
              {this.tags.map( t => <span key={t}>{t} </span> )}
            </div>
            <a className="" href="#" onClick={this.onRemoveOrg}><span><i className="material-icons">delete</i> Remove from plan</span></a>
          </div>
          <div className="col s4 m3">
            <div className="amount"><input placeholder="$" {...inProps}/></div>
          </div>
        </div>
      </div>
    );
  }
}

Org.INPUT_SELECTOR = 'item-amount';

module.exports = Org;

