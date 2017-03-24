import React from 'react';

//import path  from 'jspath';


const FilterCheckbox = ({ name, slug, cat, onTermsChecked, selected, disabled }) => {

  const checked = selected[cat].includes(slug);

  const cProps = {
    type:      'checkbox',
    className: `filter-checkbox ${selected ? 'filled-in' : ''}`,
    id:        'checkbox-' + slug,
    onChange:   () => onTermsChecked (cat, [slug], !checked),
    checked:    !disabled && checked,
  };

  return (
    <div className="filter">
      <input {...cProps} /> <label htmlFor={cProps.id}>{name}</label>
    </div>
  );
};

class Filter extends React.Component {

  constructor() {
    super(...arguments);
    this.state = { seeAll: true };
    this.onToggleAll    = this.onToggleAll.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this._sendSelected  = this._sendSelected.bind(this);
  }

  onToggleAll(e) {
    e.preventDefault();
    this.setState({ seeAll: true }, () => setTimeout( this._sendSelected, 200 ));
  }

  onFilterChange() {
    this.setState({ seeAll: false });
  }

  _sendSelected() {

    const {
      name,
      onTermsChecked
    } = this.props;

    onTermsChecked( name, [], false );
  }


  render() {
    const {
      seeAll,
    } = this.state;

    const {
      label,
      name,
      terms,
    } = this.props;

    return (
      <div className={`filter-group ${name}-filters`}>
        <div className="filter-group-label">
          {label}
          {!seeAll && <a href='' className="clear-filters" onClick={this.onToggleAll}>clear</a>}
        </div>
        <div onChange={this.onFilterChange} >
          {Object.keys(terms).map( t => <FilterCheckbox {...this.props} {...terms[t]} key={t} cat={name} /> )}
        </div>
      </div>
    );
  }
}

module.exports = Filter;
