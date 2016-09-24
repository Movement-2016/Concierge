import React      from 'react';
import { Link } from 'react-router';
import StateMap from './StateMap.jsx';

import { PageContext }  from './ContextMixins.js';
import { Thermometer }  from './DonateHeader.jsx';
import commaize         from 'commaize';

import SocialButtons from './Social.jsx';

class HomePage extends PageContext(React.Component) {

  get pages() {
    return ['home', 'info', 'testimonials'];
  }

  stateFromStore( storeState ) {
    super.stateFromStore( storeState );
    this.setState( { donateStats: { ...storeState.service.donateStats} });
  }

  render() {
    const { goal, pledged } = this.state.donateStats;

    return(
      
      <main>
        <section className="donate-section">
          <div className="container">
            <h2 className="intro-text">Support the best Community-Based Vote&nbsp;Groups&nbsp;in&nbsp;the&nbsp;Country</h2>
            <div className="pledge-box">
              <div className="pledge-box-title">Choose A Way To Give</div>
              <div className="thermometer-area">
                <Thermometer {...this.state.donateStats} />
                <div className="thermometer-numbers">
                  <div className="thermometer-current">{'$' + commaize(pledged) + ' Pledged'}</div>
                  <div className="thermometer-goal">{'$' + commaize(goal) + ' Goal'}</div>
                </div>
              </div>
              <div className="pledge-area row">
                <div className="pledge-col col s12 m4">
                  <div className="pledge">
                    <Link className="pledge-button btn waves-effect waves-light" to="/donate">Easy Donate</Link>
                    <div className="pledge-desc">Split your contribution evenly between all Movement 2016 groups in purple states.</div>
                  </div>
                </div>
                <div className="pledge-col col s12 m4">
                  <div className="pledge hide-on-small-and-down">
                    <Link className="pledge-button btn waves-effect waves-light" to="/groups">Browse Groups</Link>
                    <div className="pledge-desc">Custom plan your giving. Filter groups by state, issue area, or nonprofit tax status.</div>
                  </div>
                </div>
                <div className="pledge-col col s12 m4">
                  <div className="pledge">
                    <Link className="pledge-button btn waves-effect waves-light" to="/getintouch">Talk To A Human</Link>
                    <div className="pledge-desc">Our team provides free research on states and organizations based on your priorities. Awesome!</div>
                  </div>
                </div>
              </div>
            </div>
            <SocialButtons />
          </div>
        </section>
        <section className="testimonial-section">
          <div className="container">
          <div className="row">
            <div className="col s12 m6 l3">
              <div className="testimonial">
                <div className="testimonial-content">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</div>
                <div className="testimonial-author">Steve Baliwag</div>
              </div>
            </div>
            <div className="col s12 m6 l3">
              <div className="testimonial">
                <div className="testimonial-content">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</div>
                <div className="testimonial-author">Ringo Brewn</div>
              </div>
            </div>
            <div className="col s12 m6 l3">
            <div className="testimonial">
              <div className="testimonial-content">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</div>
              <div className="testimonial-author">Floppy Fern</div>
            </div>
            </div>
            <div className="col s12 m6 l3">
            <div className="testimonial">
              <div className="testimonial-content">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</div>
              <div className="testimonial-author">Sierra Sierra</div>
            </div>
            </div>
          </div>
        </div>
        </section>
        <section className="volunteer-section" />
        <section className="map-section hide-on-small-and-down">
          <div className="container">             
            <StateMap />
          </div>
        </section>
      </main>

    );
  }
}

module.exports = HomePage;
