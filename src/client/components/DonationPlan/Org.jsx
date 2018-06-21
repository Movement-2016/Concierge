import React from 'react';
import { connect } from 'react-redux';
import path from 'jspath';
import commaize from 'commaize';

import ContributeButton from './ContributeButton.jsx';

import { selectPrevElement, selectNextElement } from '../../ui/util';

import { addPlanItem, toggleItem } from '../../../shared/store/actions/plan';

const KEY_ARROW_UP = 40;
const KEY_ARROW_DOWN = 38;

class _Org extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { value: this.props.amount || '' };
  }

  onChange = e => {
    let {
      target: { value },
    } = e;
    value = value.replace(/[^0-9]/g, '');

    const { id, addPlanItem } = this.props;

    addPlanItem(id, value || 0);
    this.setState({ value });
  };

  onKeyDown = e => {
    var sel = '.' + _Org.INPUT_SELECTOR;
    if (e.keyCode === KEY_ARROW_DOWN) {
      selectPrevElement(sel);
    } else if (e.keyCode === KEY_ARROW_UP) {
      selectNextElement(sel);
    }
  };

  onRemoveOrg = e => {
    e.preventDefault();
    this.props.toggleItem(this.props.id);
  };

  render() {
    const {
      title: name,
      c3_donate_link,
      c4_donate_link,
      website: urlWeb,
      tags,
      readonly,
      mobile,
    } = this.props;

    const urlGive = c3_donate_link || c4_donate_link || urlWeb;

    const { value } = this.state;

    const inProps = {
      type: 'text',
      className: _Org.INPUT_SELECTOR,
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
    };

    const cls = 'group' + (readonly ? ' readonly' : '');

    const nptags = path('.{.category.slug=="nonprofit-type"}.name', tags);

    return (
      <div className={cls}>
        <div className="row">
          <div className="col s8 m9">
            <div className="group-title">{name}</div>
            <div className="nonprofit-tags">{nptags.join(', ')}</div>
          </div>
          <div className="col s4 m3 amount-col">
            <div className="amount-wrapper">
              <div className="amount">
                {readonly ? (
                  value ? (
                    '$' + commaize(value)
                  ) : (
                    '$0'
                  )
                ) : (
                  <input placeholder="$" {...inProps} />
                )}
              </div>
              {readonly ? (
                <ContributeButton urlGive={urlGive} amount={value} />
              ) : (
                !mobile && (
                  <a className="remove-group" onClick={this.onRemoveOrg}>
                    <i className="material-icons">{'close'}</i>
                    {'Remove'}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

_Org.INPUT_SELECTOR = 'orgsel';

const mapDispatchToProps = { addPlanItem, toggleItem };

const Org = connect(
  null,
  mapDispatchToProps
)(_Org);

module.exports = Org;
