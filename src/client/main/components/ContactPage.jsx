import React from 'react';
import { Shell } from './ContentPage.jsx';
import Form from './ContactForm.jsx';
import { emailContact } from '../store/utils';

class ContactPage extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

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
      storeState: this.context.store.getState(),
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
      <Shell title="contact" name="Get In Touch">
        <div className="content">
          {error && <p className="error">{error}</p>}
          <p>{done ? done : 'Questions? Suggestions? Feedback? Let us know!'}</p>
          {!done && <Form onSubmit={this.onSubmit} />}
        </div>
      </Shell>
    );
  }
}

export default ContactPage;
