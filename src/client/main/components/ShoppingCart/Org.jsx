import React     from 'react';
import path      from 'jspath';

import { addPlanItem } from '../../store/actions';

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
    const pred = tags.map( t => `.name=="${t}"` ).join('||');
    this.tags = path(`."nonprofit-type".terms..{${pred}}.label`,filters);

    this.state = { value: this.props.amt || '' };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
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
      <div className="group-plan">
        <div className="giving-area">{'$'}<input {...inProps}/></div>
        <div className="name-plan" dangerouslySetInnerHTML={{__html:name}} />
        <div className="org-type-area">
          {this.tags.map( t => <span key={t}>{t} </span> )}
        </div>
      </div>
    );
  }
}

Org.INPUT_SELECTOR = 'item-amount';

module.exports = Org;

