import React from 'react';

const ContactPage = () => {
  return (
    <main className={`content-page contact`}>
      <div className="container small-container">
        <h1 className="page-title">Get In Touch</h1>
        <div className="content">
          <p>Questions? Suggestions? Feedback? Let us know!</p>
          <p>Send an email to <a href='mailto:advisor@movement2016.org'>advisor@movement2016.org</a></p>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
