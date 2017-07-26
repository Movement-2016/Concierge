import React from 'react';
import {connect} from 'react-redux';
import { Shell } from './ContentPage.jsx';
import ProfileForm from './Profile/Form.jsx';
import { emailPlan } from '../services/email';

class _ConsultPage extends React.Component {

  constructor() {
    super(...arguments);
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
    this.onDone = this.onDone.bind(this);
    this.state = {
      error: '',
      msg: ''
    };
  }

  onError(error) {
    this.setState({ error });
  }

  onDone(msg) {
    this.setState({ msg });
  }

  onSubmit(e) {
    e.preventDefault();

    const {
      user,
      plan
    } = this.props;

    const {
      onError,
      onDone
    } = this;

    const props = {
      onError,
      onDone,
      user,
      plan,
      forceConsult: true
    };
    
    emailPlan( props );
  }

  render() {
    return (
      <Shell title="Request a Consultation" name="custom-planning profile-page">
        <p className="page-description">{'Please make sure your information is correct and an advisor will be in touch soon!'}</p>
        <ProfileForm onSubmit={this.onSubmit} submitText="Request Consultation" />
      </Shell>
    );
  }
}

const mapStateToProps = s => ({user: s.user, plan: s.plan});
const ConsultPage = connect(mapStateToProps)(_ConsultPage);

module.exports = ConsultPage;
