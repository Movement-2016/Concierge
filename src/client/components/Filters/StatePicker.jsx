import React from 'react';
import { connect } from 'react-redux';

import Link from '../../services/LinkToRoute';

import { 
  DEFAULT_STATE_FILTER
} from '../../../shared/store/actions/groups';

const _StatePicker = ({
  visible,
  value,
  onPick
}) => visible.length
        ? <select className="jump-state browser-default" value={value} onChange={onPick}>
            <option value={DEFAULT_STATE_FILTER}>{'Select State...'}</option>
            {visible.map(({slug,name}) => <option key={slug} value={slug}>{name}</option>)}
          </select>
        : <span />;


const mapStateToProps = ({
  router: {
    target: {
      model: {
        db
      }
    }
  },
  groups: { 
    filters, 
  }
}) => ({ visible: db.visibleStates(filters) });

const mapDispatchToProps = () => {
  return {
    onPick: ({target:{value}}) => value !== DEFAULT_STATE_FILTER && Link.navigateTo( '#' + value )
    };
  };

const StatePicker = connect( mapStateToProps, mapDispatchToProps )(_StatePicker);

module.exports = StatePicker;
