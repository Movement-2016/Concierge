import React       from 'react';
import { connect } from 'react-redux';
import ColorGroup  from './ColorGroup.jsx';

import { toggleItem }   from '../../../shared/store/actions/plan';
import shallowEqual     from '../../../shared/lib/shallowEqual';

import {
  getVisibleOrgs,
  trimOrgs
} from '../../../shared/lib/group-utils';

function log() { var d = new Date(); console.log(...arguments, d, d.getMilliseconds()); return true; } // eslint-disable-line no-console

const _OrgsList = ({
      selected,
      filters,
      statesDict,
      colors,
      orgs,
      colorGroups,
      mobile,
      toggleItem
    }) => log('PAINTING ORGLIST') &&
      <div className="group-area">
        {colors.map( color => 
          <ColorGroup {...{key:color, states:orgs[color], selected, filters, statesDict, mobile, toggleItem,...colorGroups[color]}}/>)}
      </div>;


const mapStateToProps = ({
    groups: {
      selected,
      visibility,
    },
    router: {
      route: {
        params: {
          slug
        }
      },
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

  const orgs        = getVisibleOrgs( trimOrgs(allOrgs,slug), visibility );
  const colorGroups = colorSections.reduce( (accum,color) => (accum[color.slug] = color, accum), {} );
  const order       = colorOrder.reduce( (accum,c,i) => (accum[c] = i, accum), {} );
  const visible     = Object.keys(orgs || {}).reduce( (accum,colorGroup) => (accum[colorGroup] = colorGroups[colorGroup],accum), {} );
  const colors      = Object.keys(visible).sort( (a,b) => order[a] > order[b] );

  return { selected, filters, statesDict, colors, orgs, colorGroups };
};

const mapDispatchToProps = { toggleItem };

const preventRefreshOnNavigate = (s1,s2) => s2.router.navigating || shallowEqual(s1.groups,s2.groups);

const opts = { areStatesEqual: preventRefreshOnNavigate };

const OrgsList = connect(mapStateToProps,mapDispatchToProps,null,opts)(_OrgsList);

module.exports = OrgsList;
