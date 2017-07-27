import React         from 'react';
import { connect }   from 'react-redux';
import { emailPlan } from '../../services/email';

class _EmailPlanButton extends React.Component {

  constructor() {
    super(...arguments);
    this.onEmail = this.onEmail.bind(this);
  }

  onEmail(e) {
    e.preventDefault();

    const { 
      onError, 
      onDone,
      user,
      plan
    } = this.props;

    emailPlan( { user, plan, onError, onDone } );
  }

  render() {
    const { text, children } = this.props;
    return <button onClick={this.onEmail} className="complete-button btn waves-effect waves-light">{text}{children}</button>;
  }
}

const mapStateToProps = s => ({ plan: s.plan, user: s.user });

const EmailPlanButton = connect(mapStateToProps)(_EmailPlanButton);

module.exports = EmailPlanButton;

