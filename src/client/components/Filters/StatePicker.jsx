import React from 'react';
import { connect } from 'react-redux';

import Link from '../../services/LinkToRoute';

import { 
  stateFilter,
  DEFAULT_STATE_FILTER
} from '../../../shared/store/actions/groups';

const onPick = ({target:{value}},stateFilter) => {
    stateFilter(value);
    value !== DEFAULT_STATE_FILTER && Link.navigateTo( '#' + value );
};

const _StatePicker = ({
  visible,
  terms,
  value,
  stateFilter
}) => visible.length
        ? <select className="jump-state browser-default" value={value} onChange={e => onPick(e,stateFilter)}>
            <option value={DEFAULT_STATE_FILTER}>{'Select State...'}</option>
            {visible.map(k => <option key={k} value={k}>{terms[k].name}</option>)}
          </select>
        : <span />;


const StatePicker = connect( null, { stateFilter } )(_StatePicker);

module.exports = StatePicker;
