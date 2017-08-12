import React         from 'react';
import { connect } from 'react-redux';
import ColorGroup from './ColorGroup.jsx';

import { toggleItem }       from '../../../shared/store/actions/plan';
import { equalIfSameRoute } from '../../../shared/store/actions/router';

import {
  getVisibleOrgs
} from '../../../shared/lib/group-utils';


const _OrgsList = ({
      selected,
      filters,
      statesDict,
      colors,
      orgs,
      colorGroups,
      mobile,
      toggleItem
    }) =>
      <div className="group-area">
        {colors.map( color => <ColorGroup
                                key={color}
                                {...colorGroups[color]}
                                selected={selected}
                                states={orgs[color]}
                                filters={filters}
                                statesDict={statesDict}
                                mobile={mobile}
                                toggleItem={toggleItem}
                              />
        )}
      </div>;

const mapStateToProps = ({
    groups: {
      selected,
      visibility,
    },
    router: {
      target: {
        model: {
            groupFilters: filters,
            statesDict,
            colorSections,
            colorOrder,
            orgs: allOrgs,
          }
      }
    }
  }) => {

  const orgs        = getVisibleOrgs( allOrgs, visibility );
  const colorGroups = colorSections.reduce( (accum,color) => (accum[color.slug] = color, accum), {} );
  const order       = colorOrder.reduce( (accum,c,i) => (accum[c] = i, accum), {} );
  const visible     = Object.keys(orgs || {}).reduce( (accum,colorGroup) => (accum[colorGroup] = colorGroups[colorGroup],accum), {} );
  const colors      = Object.keys(visible).sort( (a,b) => order[a] > order[b] );

  return { selected, filters, statesDict, colors, orgs, colorGroups };
};

const mapDispatchToProps = { toggleItem };

const opts = { areStatesEqual: equalIfSameRoute };

const OrgsList = connect(mapStateToProps,mapDispatchToProps,null,opts)(_OrgsList);

module.exports = OrgsList;
