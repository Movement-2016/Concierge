import React from 'react';
import { connect } from 'react-redux';
import ColorGroup from './ColorGroup.jsx';
import scrollToElement from '../../lib/scrollToElement';

const getVisibleColorSections = (allColorSections,orgs) => {
  const visible = {};
  Object.keys(orgs || {}).forEach( colorGroup => visible[colorGroup] = allColorSections[colorGroup] );
  return visible;
};

class _OrgsList extends React.Component {

  componentDidMount() {
    // Scrolls to correct state if hash is found in url
    if ( location.hash ) {
      const elementName = location.hash.replace('#','');
      const element = document.getElementById(elementName);
      element && scrollToElement('#' + elementName);
    }
  }

  getVisibleColorSections() {

    const {
      model: {
        groupFilters: filters,
        statesDict,
        colorSections,
        colorOrder,
      },
      visibleOrgs: orgs,
      groups
    } = this.props;

    const order       = colorOrder.reduce( (accum,c,i) => (accum[c] = i, accum), {} );
    const colorGroups = colorSections.reduce( (accum,color) => (accum[color.slug] = color, accum), {} );
    const sections    = getVisibleColorSections(colorGroups,orgs);
    const colors      = Object.keys(sections).sort( (a,b) => order[a] > order[b] );

    return { groups, filters, statesDict, sections, colors, orgs, colorGroups };
  }

  render() {

    const {
      groups: {
        selected
      },
      colors,
      orgs,
      colorGroups,
      filters,
      statesDict
    } = this.getVisibleColorSections();

    const {
      store,
      mobile
    } = this.props;

    return (
      <div className="group-area">
        {colors.map( color => <ColorGroup
                                key={color}
                                {...colorGroups[color]}
                                selected={selected}
                                states={orgs[color]}
                                filters={filters}
                                store={store}
                                statesDict={statesDict}
                                mobile={mobile}
                              />
        )}
      </div>
    );
  }
}

const mapStateToProps = s => ({ groups: s.groups });

const OrgsList = connect(mapStateToProps)(_OrgsList);

module.exports = OrgsList;
