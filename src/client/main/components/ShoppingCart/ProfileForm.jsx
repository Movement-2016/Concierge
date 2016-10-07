import React         from 'react';
import ProfileInput  from './ProfileInput.jsx';

class ProfileForm extends React.Component {

  constructor() {
    super(...arguments);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();    
  }

  render() {
    const { submitText = 'Complete Plan' } = this.props;

    return (
        <form className="plan-form profile-form" onSubmit={this.onSubmit}>
          <div className="info-area">
            <h3>Your Information</h3>
            <div className="row">
              <div className="col s12 m6">
                <ProfileInput name="fname" placeholder="First Name" /> 
              </div>
              <div className="col s12 m6">
                <ProfileInput name="lname" placeholder="Last Name"  /> 
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
                <ProfileInput name="email" placeholder="Email *" required />
              </div>
              <div className="col s12 m6">
                <ProfileInput name="phone" placeholder="Phone *" required /> 
              </div>
            </div>
          </div>
          <div className="action-area"> 
            <button id="profile-form-submit" className="waves-effect waves-light btn" type="submit">{submitText}</button>
          </div>
        </form>
      );
  }
}

module.exports=ProfileForm;

