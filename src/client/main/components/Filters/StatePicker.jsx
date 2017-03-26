import React from 'react';

class StatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'select-state'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const newValue = event.target.value;
    if (newValue != 'select-state') {
      this.props.onShowElement(newValue);
    }
    this.setState({value: newValue});
  }

  render() {
    const {visible, terms} = this.props;

    if (!visible.length) {
      return <span/>;
    }
    const map = {};

    terms.forEach(t => map[t.slug] = t);

    return (
      <select className="jump-state browser-default" value={this.state.value} onChange={this.handleChange}>
        <option value="select-state">Select State...</option>
        {visible.map(k => <option key={k} value={map[k].slug}>{map[k].name}</option>)}
      </select>
    );
  }

}

module.exports = StatePicker;
