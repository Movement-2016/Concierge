import React from 'react';

import Group from './Group.jsx';

class Section extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor() {
    super(...arguments);

    this.state = {
      expanded: true
    };

    this.grpsId = 'section-groups-' + this.props.name;
    this.hashId = '#' + this.grpsId;
  }

  componentDidMount() {
    /* globals $ */
    $(this.hashId)
      .on('show.bs.collapse', () => this.setState( {expanded:true} ) )
      .on('hide.bs.collapse', () => this.setState( {expanded:false} ) );
  }

  componenWillUnmount() {
    $(this.hashId)
      .off('show.bs.collapse')
      .off('hide.bs.collapse');
  }

  render() {
    const {
      name,
      label,
      groups
    } = this.props;

    const {
      expanded
    } = this.state;

    const allGroups = this.context.store.getState().service.groupings.terms;

    const toggle = expanded ? 'minus' : 'plus';

    return (
      <div className="section" id={name}>
        <a name={name} />
        <a data-toggle="collapse" data-target={this.hashId}>
          <div className="sectionHead">
            <span className={`sectionToggle glyphicon glyphicon-${toggle}`} />
            {label}
          </div>
        </a>
        <div className="sectionGroups collapse in" id={this.grpsId}>
          {Object.keys(groups).map( s => <Group key={s} {...allGroups[s]} items={groups[s]} />)}
        </div>
      </div>
      );
  }
}

module.exports = Section;