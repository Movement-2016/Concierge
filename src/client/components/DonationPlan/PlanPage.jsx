import React            from 'react';
import { connect }      from 'react-redux';
import { navigateTo }   from '../../services/LinkToRoute';

import BackLink         from '../BackLink.jsx';
import Plan             from './Plan.jsx';
import Totals           from './Totals.jsx';
import RequestConsult   from './RequestConsult.jsx';
import AutoSavePlan     from './AutoSavePlan.jsx';
import SummaryLink      from './SummaryLink.jsx';

const PageDescription = () =>
        <p className="page-description" >
            {`Enter a planned donation for each group. Once you complete 
              your donation plan, we will email you a copy with simple instructions 
              on how to donate directly to your chosen groups.`}
        </p>;

class _PlanPage extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      done: '',
      error: ''
    };
  }

  componentDidUpdate() {
    if( !this.props.isLoggedIn ) {
      navigateTo( '/groups' );
    }
  }

  onDone = (done) => this.setState({ done });
  onError = (error) => this.setState({ error });

  render() {

    const {
      done,
      error
    } = this.state;

    return (
      <main className="content-page custom-planning cart-page">
        <div className="container small-container">
          <h1 className="page-title">{'Your Donation Plan'}</h1>
          <PageDescription />
          <div className="padded-form donation-form">
            <div className="row">
              <div className="col s12 l8">
                <Plan {...this.props} />
              </div>
              <div className="col s12 l4">
                <div className="total-section">
                  <Totals />
                  <div className="link-area">
                    <SummaryLink  />
                    <AutoSavePlan onError={this.onError} onDone={this.onDone} />
                    {done && <div className="submit-message submit-success">{done}</div>}
                    {error && <div className="submit-message submit-error">{error.toString()}</div>}
                    <RequestConsult />
                  </div>
                </div>
              </div>
            </div>
            <BackLink to="/groups" title="Browse Groups">{'Browse Groups'}</BackLink>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ auth: {authenticated} }) => ({ isLoggedIn: authenticated });
const PlanPage = connect(mapStateToProps)(_PlanPage);

module.exports = PlanPage;
