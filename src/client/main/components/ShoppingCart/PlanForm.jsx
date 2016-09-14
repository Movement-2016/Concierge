import React     from 'react';
import Alert     from '../../../ui/Alert.jsx';

import EmailPlanButton from './EmailPlanButton.jsx';
import ProfileInput    from './ProfileInput.jsx';

class PlanForm extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      error: null,
      msg: null
    };

    this.onError = this.onError.bind(this);
    this.onDone  = this.onDone.bind(this);
  }

  onError(error) {
    this.setState({ error, msg: '' });
  }

  onDone(msg) {
    this.setState({ error: '', msg });
  }

  render() {
    const { error, msg } = this.state;

    const btnProps = {
      onError: this.onError,
      onDone: this.onDone
    };

    return (
        <div className="plan-form">
          <h2> Plan Your Contributions </h2>
          <p>Use this worksheet to help plan how to most effectively make your donations to grassroots movement groups.</p> 
          <Alert msg={error || msg} type={error ? Alert.DANGER : Alert.SUCCESS} />
          <div className="info-area">
            <h3>Your Information</h3> 
            <ProfileInput name="fname" placeholder="First Name" /> 
            <ProfileInput name="lname" placeholder="Last Name"  /> 
            <ProfileInput name="email" placeholder="Email"      /> 
            <ProfileInput name="phone" placeholder="Phone"      />
            <div className="action-area"> 
              <EmailPlanButton {...btnProps} >Email me this plan</EmailPlanButton>
              {' or '}
              <EmailPlanButton {...btnProps} advisorMode>Request consultation</EmailPlanButton>
            </div>
          </div>
        </div>
      );
  }
}

module.exports=PlanForm;

