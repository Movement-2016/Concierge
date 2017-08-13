import React from 'react';

class Filter extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.checked !== nextProps.checked;
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

const FilterGroup = ({
    label,
    name,
    terms,
    onFilterChange,
    selectedFilters
  }) => <div className={`filter-group ${name}-filters`}>
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
;

module.exports = FilterGroup;
