import React         from 'react';
import ProfileInput  from './ProfileInput.jsx';

class PlanForm extends React.Component {

  constructor() {
    super(...arguments);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();    
  }

  render() {
    return (
        <form className="plan-form" onSubmit={this.onSubmit}>
          <div className="info-area">
            <h3>Your Information</h3> 
            <ProfileInput name="fname" placeholder="First Name" /> 
            <ProfileInput name="lname" placeholder="Last Name"  /> 
            <ProfileInput name="email" placeholder="Email *" required /> 
            <ProfileInput name="phone" placeholder="Phone *" required />
          </div>
          <div className="action-area"> 
            <button id="profile-form-submit" className="waves-effect waves-light btn" type="submit"><i className="material-icons right">send</i>Continue</button>
          </div>
        </form>
      );
  }
}

module.exports=PlanForm;

