import React from 'react';
import { connect } from 'react-redux';
import commaize from 'commaize';

class _Totals extends React.Component {
  render() {
    const { planTotal } = this.props;

    return (
      <div className="plan-total">
        <span className="label">{'Total'}</span>
        <span className="total">{'$' + commaize(planTotal)}</span>
      </div>
    );
  }
}

const mapStoreToProps = s => ({ planTotal: s.plan.total });

const Totals = connect(mapStoreToProps)(_Totals);

module.exports = Totals;
