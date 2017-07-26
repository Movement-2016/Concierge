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
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(message) {

    emailContact({
      user: this.props.user,
      onDone:  done  => this.setState({ done }),
      onError: error => this.setState({ error }),
      message,
    });
  }

  render() {

    const {
      done,
      error
    } = this.state;

    const {
      store
    } = this.props;
    
    return (
      <ContentPage model={this.props.model} pageName="contact">
        <ContactForm store={store} onSubmit={this.onSubmit}>
          {done && <div className="submit-message submit-success">{done}</div>}
          {error && <div className="submit-message submit-error">{error}</div>}
        </ContactForm>
      </ContentPage>
    );
  }
}

const mapStateToProps = s => ({ user: s.user });
const ContactPage = connect(mapStateToProps)(_ContactPage);

export default ContactPage;
