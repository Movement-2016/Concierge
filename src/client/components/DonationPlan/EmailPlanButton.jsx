import React         from 'react';
import { connect }   from 'react-redux';
import { emailPlan } from '../../services/email';

class _EmailPlanButton extends React.Component {

  constructor() {
    super(...arguments);
  }

  onEmail = (e) => {
    e.preventDefault();

    const {
      onError,
      onDone,
      user,
      plan
    } = this.props;

    emailPlan( { user, plan } )
      .then( done => onDone(done) )
      .catch( err => onError(err) );
  }

  render() {
    const { text, children } = this.props;
    return <button onClick={this.onEmail} className="complete-button btn waves-effect waves-light">{text}{children}</button>;
  }
}

const mapStateToProps = s => ({ plan: s.plan, user: s.user });

const EmailPlanButton = connect(mapStateToProps)(_EmailPlanButton);

module.exports = EmailPlanButton;
