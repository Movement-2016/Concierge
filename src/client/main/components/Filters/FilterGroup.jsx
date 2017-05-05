import React from 'react';

function Filter(props) {

  const {
    label,
    slug,
    category,
    onChange,
    checked
  } = props;

  const checkboxProps = {
    type:      'checkbox',
    className: 'filter-checkbox filled-in',
    id:        'checkbox-' + slug,
    onClick:   () => onChange(category, slug, !checked),
    checked
  };

  return (
    <div className="filter">
      <input {...checkboxProps} /> <label htmlFor={checkboxProps.id}>{label}</label>
    </div>
  );
}

function FilterGroup(props) {

  const {
    label,
    name,
    terms,
    onFilterChange,
    selected
  } = props;

  return (
    <div className={`filter-group ${name}-filters`}>
      <div className="filter-group-label">
        {label}
      </div>
      {selected[name] && Object.keys(terms).map( t => {
          const checked = selected[name].includes(t) ? true : false
          const filterProps = {
            slug:     t,
            label:    terms[t].name,
            category: name,
            onChange: onFilterChange,
            checked
          };
          return <Filter key={t} {...filterProps} />
        }
      )}
    </div>
  );
}

module.exports = FilterGroup;