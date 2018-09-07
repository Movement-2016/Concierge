import React from 'react';
import { connect } from 'react-redux';
import ActionSection from './ActionSection.jsx';
import { FundPageBody } from './FundPage.jsx';

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

class FundSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideDonateButton: true,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // add 'active' class to donate button once fundTitle element is 80px from bottom of viewport
  handleScroll = () => {
    var bounding = this._fundSection.getBoundingClientRect();
    if (bounding.top + 200 <= window.innerHeight) {
      this.setState({ hideDonateButton: false });
    } else {
      this.setState({ hideDonateButton: true });
    }
  };

  render() {
    const { mobile, fund, groups } = this.props;
    return (
      <div className="fund-section" ref={el => (this._fundSection = el)}>
        <div className="container">
          <h2 className="fund-title">{fund.title}</h2>
          <FundPageBody
            mobile={mobile}
            fund={fund}
            groups={groups}
            hideDonateButton={this.state.hideDonateButton}
          />
        </div>
      </div>
    );
  }
}

const _PuertoRicoPage = ({ mobile, funds, groups }) => {
  const actionSectionProps = {
    title: 'Join The Fight',
    description:
      'I commit to register as many voters as possible who are committed to fighting for the people of Puerto Rico both on the island and in the Diaspora. I commit to holding candidates accountable to helping rebuild Puerto Rico and supporting the hundreds of thousands of Puerto Ricans living in the states. Together we can be the power and change our community needs!',
    buttonText: 'Take The Pledge',
    successMessage:
      'Thanks for adding your name! We will follow up to let you know how you can help.',
    errorMessage:
      'Oops! There was an error and your information could not be submitted. Please try again or email info@movement.vote.',
  };
  const fund = funds.find(el => el.slug === 'puertorico');
  return (
    <main className="puerto-rico-page">
      <div className="intro-section">
        <div className="container">
          <img className="page-logo" src="/images/prvp-logo.png" />
          <div className="intro-content">
            <Video />
            <ActionSection {...actionSectionProps} />
          </div>
        </div>
      </div>
      <FundSection mobile={mobile} fund={fund} groups={groups} />
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
