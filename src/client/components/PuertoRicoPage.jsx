import React from 'react';
import saveToSpreadsheet from '../services/saveToGoogleSheet';

class ActionSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formAlert: '',
    };
  }

  onSubmit = event => {
    event.preventDefault();
    saveToSpreadsheet();
    this.setState({ formAlert: 'success' });
    // this.props.onSubmit(this.refs.message.value);
  };

  render() {
    const { title, description, buttonText, successMessage } = this.props;
    return (
      <div className="take-action">
        <h3 className="action-title">{title}</h3>
        <p className="action-intro">{description}</p>
        <form className="action-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="input-name"
            name="name"
            ref={input => (this._name = input)}
            placeholder="Your Name"
            // required
          />
          <div className="input-wrapper">
            <input
              type="email"
              className="input-email"
              name="email"
              ref={input => (this._email = input)}
              placeholder="Email"
              // required
            />
            <input
              type="text"
              className="input-zip"
              name="zip"
              ref={input => (this._zip = input)}
              placeholder="Zip Code"
              // required
            />
          </div>
          <button className="submit-button" type="submit">
            {buttonText}
          </button>
          {this.state.formAlert === 'success' && (
            <div className="submit-message submit-success">{successMessage}</div>
          )}
        </form>
      </div>
    );
  }
}

const Video = () => (
  <div className="prvp-video">
    <div className="video-wrapper">
      <iframe
        width="420"
        height="325"
        src="https://www.youtube-nocookie.com/embed/I1dAIZ1RG64?rel=0&amp;showinfo=0"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  </div>
);

const PuertoRicoPage = () => {
  const actionSectionProps = {
    title: 'Join The Fight',
    description:
      'I commit to register as many voters as possible who are committed to fighting for the people of Puerto Rico both on the island and in the Diaspora. I commit to holding candidates accountable to helping rebuild Puerto Rico and supporting the hundreds of thousands of Puerto Ricans living in the states. Together we can be the power and change our community needs!',
    buttonText: 'Take The Pledge',
    successMessage:
      'Thanks for adding your name! We will follow up to let you know how you can help.',
  };

  return (
    <main className="puerto-rico-page">
      <div className="container">
        <img className="page-logo" src="/images/prvp-logo.png" />
        <div className="intro-section">
          <Video />
          <ActionSection {...actionSectionProps} />
        </div>
      </div>
    </main>
  );
};

module.exports = PuertoRicoPage;
