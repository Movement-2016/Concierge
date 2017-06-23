import React            from 'react';
import ContentPage      from './ContentPage.jsx';
import ContactForm      from './ContactForm.jsx';
import { emailContact } from '../store/utils';

class ContactPage extends React.Component {

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
      storeState: this.props.store.getState(),
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

    return (
      <ContentPage model={this.props.model} pageName="contact">
        <ContactForm onSubmit={this.onSubmit}>
          {done && <div className="submit-message submit-success">{done}</div>}
          {error && <div className="submit-message submit-error">{error}</div>}
        </ContactForm>
      </ContentPage>
    );
  }
}

export default ContactPage;
