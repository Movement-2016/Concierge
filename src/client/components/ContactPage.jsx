import React            from 'react';
import {connect}        from 'react-redux';
import ContentPage      from './ContentPage.jsx';
import ContactForm      from './ContactForm.jsx';
import { emailContact } from '../services/email';

class _ContactPage extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      error: '',
      done: ''
    };
  }

  onSubmit = (message) => {
    const { user } = this.props;
    emailContact({user, message})
      .then( done => this.setState({ done }) )
      .catch( error => this.setState({ error }) );
  }

  render() {

    const {
      done,
      error
    } = this.state;

    return (
      <ContentPage model={this.props.model} pageName="contact">
        <ContactForm onSubmit={this.onSubmit}>
          {done && <div className="submit-message submit-success">{done}</div>}
          {error && <div className="submit-message submit-error">{error.toString()}</div>}
        </ContactForm>
      </ContentPage>
    );
  }
}

const mapStateToProps = s => ({ user: s.user });
const ContactPage = connect(mapStateToProps)(_ContactPage);

export default ContactPage;
