import React from 'react';
import { Shell } from './ContentPage.jsx';

const ContactPage = () => {
  return (
    <Shell title="contact" name="Get In Touch">
      <div className="content">
        <p>Questions? Suggestions? Feedback? Let us know!</p>
        <p>Send an email to <a href='mailto:advisor@movement2016.org'>advisor@movement2016.org</a></p>
      </div>
    </Shell>
  );
};

export default ContactPage;
