import React from 'react';
import { connect } from 'react-redux';
import ColorGroup from './ColorGroup.jsx';

function log() {
  if (0 && process.env.NODE_ENV !== 'production') {
    var d = new Date();
    console.log(...arguments, d, d.getMilliseconds()); // eslint-disable-line no-console
  }
  return true;
}

const _OrgsList = ({ colors, states, groups, selected, mobile }) =>
  log('PAINTING ORG LIST') && (
    <div className="group-area">
      {colors.map(color => <ColorGroup key={color.id} {...{ mobile, color, states, groups, selected }} />)}
    </div>
  );

const mapStateToProps = ({
  groups: { filters, selected },
  router: {
    route: {
      params: { slug },
    },
    target: {
      model: { db },
    },
  },
}) => ({
  colors: db.visibleColors(filters, slug),
  states: db.visibleStates(filters, slug),
  groups: db.denormalizeVisibleGroups(filters, slug),
  selected,
});

const opts = {
  areStatesEqual: (s1, s2) =>
    s1.groups.filters === s2.groups.filters && s1.groups.selected === s2.groups.selected,
};

const OrgsList = connect(
  mapStateToProps,
  null,
  null,
  opts
)(_OrgsList);

module.exports = OrgsList;
