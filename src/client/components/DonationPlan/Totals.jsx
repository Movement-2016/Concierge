import React from 'react';
import { connect } from 'react-redux';

class _Totals extends React.Component {
  render() {
    const { planTotal } = this.props;

    return (
      <div className="plan-total">
        <span className="label">{'Total'}</span>
        <span className="total">{'$' + planTotal.toLocaleString()}</span>
      </div>
    );
  }
}

const mapStoreToProps = s => ({ planTotal: s.plan.total });

const Totals = connect(mapStoreToProps)(_Totals);

module.exports = Totals;
