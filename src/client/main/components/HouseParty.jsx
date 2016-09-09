import React from 'react';

const PartyForm = () => (
<div className="infobox">
  <div className="infobox-title">
    <h5>Your Information</h5>
  </div>
  <form id="houseparty-form" className="container infobox-form">
    <div className="row checkbox-group">
      <div className="col-md-6">
        <input type="checkbox" name="host-party" id="host-party" />
        <label htmlFor="host-party">Yes! I would like to host a house party!</label>
      </div>
      <div className="col-md-6">
        <input type="checkbox" name="learn-more" id="learn-more" />
        <label htmlFor="learn-more">I am interested in hosting a house party, but would like to learn more.</label>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <input type="text" name="first-name" placeholder="First Name *" required />
      </div>
      <div className="col-md-6">
        <input type="text" name="last-name" placeholder="Last Name *" required />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <input type="email" name="email" placeholder="Email *" required />
      </div>
      <div className="col-md-6">
        <input type="text" name="phone" placeholder="Phone *" required />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <input type="text" className="input-city" name="city" placeholder="City *" required />
        <input type="text" className="input-state" name="state" placeholder="State *" required />
      </div>
      <div className="col-md-6">
        <input type="text" name="affiliation" placeholder="Business or Affiliation" />
      </div>
    </div>
    <textarea name="message" placeholder="Anything else you'd like to tell us?" />
    <button id="contact-form-submit" className="waves-effect waves-light btn" type="submit"><i className="material-icons right">send</i>Submit</button>
  </form>
</div>
);

const AfterSubmit = (
  <div id="success-modal" className="modal">
    <div className="modal-content">
      <h5>Thanks for your interest!</h5>
      <p>We'll be in touch soon to follow up.</p>
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-action modal-close waves-effect btn-flat">Close</a>
    </div>
  </div>
);

PartyForm.AfterSubmit = AfterSubmit;

module.exports = PartyForm;
