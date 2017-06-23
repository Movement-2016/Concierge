import React         from 'react';

import ProfileInput  from './Input.jsx';

class ProfileForm extends React.Component {

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit();
  }

  render() {
    const { 
      submitText = 'Complete Plan',
      store 
    } = this.props;

    return (
        <div className="profile-form padded-form">
          <h3>Your Information</h3>
          <form className="user-info" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col s12 m6">
                <ProfileInput store={store} name="fname" placeholder="First Name" />
              </div>
              <div className="col s12 m6">
                <ProfileInput store={store} name="lname" placeholder="Last Name"  />
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
                <ProfileInput store={store} type="email" name="email" placeholder="Email *" required />
              </div>
              <div className="col s12 m6">
                <ProfileInput store={store} type="tel" name="phone" placeholder="Phone *" required />
              </div>
            </div>
            <div className="action-area">
              <button id="profile-form-submit" className="waves-effect waves-light btn" type="submit">{submitText}</button>
            </div>
          </form>
        </div>
      );
  }
}

module.exports=ProfileForm;
