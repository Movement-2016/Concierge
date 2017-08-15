import React from 'react';
import { connect } from 'react-redux';

import { 
  filterClear
} from '../../../shared/store/actions/groups';

const _ClearAllButton = ({ visible, filterClear }) => <a className={'clearall-button' + (visible ? ' visible' : '')} onClick={filterClear}>{'Clear All'}</a>;

const mapStateToProps = ({ groups: { visibility }} ) => ({
  visible: Object.keys(visibility).reduce((accum, category) => accum + visibility[category].length, 0) > 0
});

const mapDispatchToProps = { filterClear };

const ClearAllButton = connect( mapStateToProps, mapDispatchToProps )(_ClearAllButton);

module.exports = ClearAllButton;
