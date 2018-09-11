import React from 'react';
import { connect } from 'react-redux';
import ActionSection from './ActionSection.jsx';
import { FundContent, FundAction } from './FundPage.jsx';

const Video = () => (
  <div className="prvp-video">
    <div className="video-wrapper">
      {global.IS_SERVER_REQUEST ? (
        <span />
      ) : (
        <iframe
          width="420"
          height="325"
          src="https://www.youtube.com/embed/dKuPO-282mA?rel=0&amp;showinfo=0"
          frameBorder="0"
          allowFullScreen
        />
      )}
    </div>
  </div>
);

const _PuertoRicoPage = ({ mobile, funds, groups }) => {
  const actionSectionProps = {
    title: 'Join The Fight',
    description:
      'Pledge to help! Can you register as many voters as possible who are committed to fighting for the people of Puerto Rico both on the island and in the Diaspora? Will you hold candidates accountable to helping rebuild Puerto Rico and supporting the hundreds of thousands of Puerto Ricans living in the states? Together we can be the power and change our community needs!',
    buttonText: 'Take The Pledge',
    successMessage:
      'Thanks for adding your name! We will follow up to let you know how you can help.',
    errorMessage:
      'Oops! There was an error and your information could not be submitted. Please try again or email info@movement.vote.',
  };
  const fund = funds.find(el => el.slug === 'puertorico');
  return (
    <main className="puerto-rico-page fund-page">
      <div className="container">
        <img className="page-logo" alt="Puerto Rican Voter Project" src="/images/prvp-logo.png" />
        <div className="fund-page-body">
          <div>
            <Video />
            <FundContent mobile={mobile} fund={fund} groups={groups} />
            <ActionSection {...actionSectionProps} />
          </div>
          <FundAction mobile={mobile} fund={fund} stickyTileBottom=".fund-page-body" />
        </div>
      </div>
    </main>
  );
};

const mapStoreToProps = ({
  router: {
    target: {
      model: { funds, groups },
    },
  },
}) => ({ funds, groups });

const PuertoRicoPage = connect(mapStoreToProps)(_PuertoRicoPage);

module.exports = PuertoRicoPage;
