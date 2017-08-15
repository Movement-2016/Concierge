import React       from 'react';
import { connect } from 'react-redux';
import ColorGroup  from './ColorGroup.jsx';

// function log() { var d = new Date(); console.log(...arguments, d, d.getMilliseconds()); return true; } // eslint-disable-line no-console

const _OrgsList = ({colors,states,groups,selected}) =>
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


const OrgsList = connect(mapStateToProps)(_OrgsList);

module.exports = OrgsList;
