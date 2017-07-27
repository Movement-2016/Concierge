import React from 'react';
import { connect } from 'react-redux';

class Filter extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.checked !== nextProps.checked) {
      return true;
    }
    return false;
  }

  render() {

    const {
      label,
      slug,
      category,
      onChange,
      checked
    } = this.props;

    const checkboxProps = {
      type:      'checkbox',
      className: 'filter-checkbox filled-in',
      id:        'checkbox-' + slug,
      onChange:   () => onChange(category, slug, !checked),
      checked
    };

    return (
      <div className="filter">
        <input {...checkboxProps} /> <label htmlFor={checkboxProps.id}>{label}</label>
      </div>
    );
  }
}

function FilterGroup(props) {

  const {
    label,
    name,
    terms,
    onFilterChange,
    selectedFilters
  } = props;

  return (
    <div className={`filter-group ${name}-filters`}>
      <div className="filter-group-label">
        {label}
      </div>
      {selectedFilters[name] && Object.keys(terms).map( t => {
          const checked = selectedFilters[name].includes(t) ? true : false;
          const filterProps = {
            slug:     t,
            label:    terms[t].name,
            category: name,
            onChange: onFilterChange,
            checked
          };
          return <Filter key={t} {...filterProps} />;
        }
      )}
    </div>
  );
}

FilterGroup.propTypes = {
  label:                React.PropTypes.string.isRequired,
  name:                 React.PropTypes.string.isRequired,
  terms:                React.PropTypes.object.isRequired,
  onFilterChange:       React.PropTypes.func.isRequired,
  selectedFilters:      React.PropTypes.object.isRequired,
};

module.exports = FilterGroup;
