import React       from 'react';
import { connect } from 'react-redux';
import ColorGroup  from './ColorGroup.jsx';

function log() { if( process.env.NODE_ENV !== 'production' ) {var d = new Date(); console.log(...arguments, d, d.getMilliseconds());} return true; } // eslint-disable-line no-console

const _OrgsList = ({colors,states,groups,selected}) => log('PAINTING ORG LIST') &&
      <div className="group-area">
        {colors.map( color => <ColorGroup key={color.id} {...{color, states, groups, selected}} /> )}
      </div>;


const mapStateToProps = ({
    groups: {
      visibility,
      selected
    },
    router: {
      route: {
        params: {
          slug
        }
      },
      target: {
        model: {
          db
        }
      }
    }
  }) => ({ 
    colors: db.visibleColors(visibility),
    states: db.visibleStates(visibility),
    groups: db.denormalizeVisibleGroups( visibility ),
    selected
  });

const opts = { areStatesEqual: (s1,s2) => s1.groups.visibility === s2.groups.visibility && s1.groups.selected === s2.groups.selected};

const OrgsList = connect(mapStateToProps,null,null,opts)(_OrgsList);

module.exports = OrgsList;
