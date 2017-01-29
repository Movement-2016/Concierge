import React            from 'react';
import { Shell }        from './ContentPage.jsx';
import ContactForm             from './ContactForm.jsx';
import { emailContact } from '../store/utils';
import { PageContext }  from './ContextMixins';


class ContactText extends PageContext(React.Component) {

  get page() {
    return 'contact';
  }

  render() {
   if( !this.state || !this.state.page ) {
      return null;
    }

    const content = this.state.page.fields.html;

    return <p className="content" dangerouslySetInnerHTML={{__html:content}} />;
  }
}

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
      <Shell title="Get In Touch" name="contact">
        <div className="content">
          {error && <p className="error">{error}</p>}
          <ContactText />
          {!done && <ContactForm onSubmit={this.onSubmit} />}
        </div>
      </Shell>
    );
  }
}

export default ContactPage;
