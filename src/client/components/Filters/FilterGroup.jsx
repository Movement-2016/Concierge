import React from 'react';
import { connect } from 'react-redux';

import { 
  toggleFilter
} from '../../../shared/store/actions/groups';

class Filter extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.checked !== nextProps.checked;
  }

  render() {

    const {
      toggleFilter,
      id,
      name,
      checked
    } = this.props;

    const checkboxProps = {
      type:      'checkbox',
      className: 'filter-checkbox filled-in',
      id:        'checkbox-' + id,
      onChange:   () => toggleFilter(id),
      checked
    };

    return (
      <div className="filter">
        <input {...checkboxProps} /> <label htmlFor={checkboxProps.id}>{name}</label>
      </div>
    );
  }
}

const _FilterGroup = ({
    id,
    slug,
    name,
    tags,
    toggleFilter,
    selected
  }) => <div className={`filter-group ${slug}-filters`}>
          <div className="filter-group-label">
            {name}
          </div>
          {tags.filter( tag => tag.category === id ).map( ({id,name}) => <Filter key={id} {...{toggleFilter,id,name,checked:selected.includes(id)}} />)}
        </div>
;

const mapStateToProps = ({
  router: {
    target: {
      model: {
        db: {
          tags
        }
      }
    }
  },
  groups: {
    visibility: selected
  }
}) => ({ tags, selected });

const mapDispatchToProps = { toggleFilter };

const FilterGroup = connect( mapStateToProps, mapDispatchToProps )(_FilterGroup);

module.exports = FilterGroup;
