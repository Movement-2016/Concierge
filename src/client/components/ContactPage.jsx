import React from 'react';
import { connect } from 'react-redux';
import ContentPage from './ContentPage.jsx';
import ContactForm from './ContactForm.jsx';
import { emailContact } from '../services/email';

class _ContactPage extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      error: '',
      done: '',
    };
  }

  onSubmit = message => {
    const { profile } = this.props;

    emailContact({ profile, message })
      .then(done => this.setState({ done }))
      .catch(error => this.setState({ error }));
  };

  render() {
    const {
      pageName = 'contact',
      successMsg = 'Success! Your message has been sent.',
      errorMsg = 'Error. Your message could not be sent at this time. Please email advisor@movement.vote directly.',
    } = this.props;
    const { done, error } = this.state;

    return (
      <ContentPage pageName={pageName}>
        <ContactForm onSubmit={this.onSubmit}>
          {done && <div className="submit-message submit-success">{successMsg}</div>}
          {error && <div className="submit-message submit-error">{errorMsg}</div>}
        </ContactForm>
      </ContentPage>
    );
  }
}

const mapStateToProps = ({ profile }) => ({ profile });
const ContactPage = connect(mapStateToProps)(_ContactPage);

export default ContactPage;
