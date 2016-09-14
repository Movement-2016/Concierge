import React     from 'react';
import Alert     from '../../../ui/Alert.jsx';

import EmailPlanButton from './EmailPlanButton.jsx';
  

class PlanForm extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      error: null,
      msg: null
    };
    this.onEmailMe = this.onEmailMe.bind(this);
    this.onRequestAdvisor = this.onRequestAdvisor.bind(this);
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
      onDone: this.onDone,
      form: this.refs
    };

    return (
        <div className="plan-form">
          <h2> Plan Your Contributions </h2>
          <p>Use this worksheet to help plan how to most effectively make your donations to grassroots movement groups.</p> 
          <Alert msg={error || msg} type={error ? Alert.DANGER : Alert.SUCCESS} />
          <div className="info-area">
            <h3>Your Information</h3> 
            <input ref="fname" name="fname" type="text" placeholder="First Name" defaultValue="" /> 
            <input ref="lname" name="lname" type="text" placeholder="Last Name" defaultValue="" /> 
            <input ref="email" name="email" type="text" placeholder="Email" defaultValue="" /> 
            <input ref="phone" name="phone" type="text" placeholder="Phone" defaultValue="" />
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

