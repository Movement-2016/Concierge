import React      from 'react';
import { Link } from 'react-router';
import StateMap from './StateMap.jsx';

import { PageContext } from './ContextMixins.js';


const SubSection = ({ section, numCols, colsPerRow }) => {
  return(
      <div className={`col-md-${numCols}`}>
        <Tiles {...section} colsPerRow={colsPerRow} />
      </div>
    );
};

class HomePage extends PageContext(React.Component) {
  get pages() {
    return ['home', 'info', 'testimonials'];
  }

  render() {
    return(
      
      <main>
        <section className="donate-section">
          <div className="container">
            <h2 className="intro-text">Support The Best Community-Based Vote Groups In The Country</h2>
            <div className="pledge-box">
              <div className="pledge-box-title">Choose A Way To Give</div>
              <div className="thermometer-area">
                <div className="thermometer">
                  <div className="mercury"></div>
                </div>
                <div className="thermometer-numbers">
                  <div className="thermometer-current">$1,776,643 Pledged</div>
                  <div className="thermometer-goal">$3,000,000 Goal</div>
                </div>
              </div>
              <div className="pledge-area row">
                <div className="pledge-col col s12 m4">
                  <div className="pledge">
                    <Link className="pledge-button btn waves-effect waves-light" to="/donate">Easy</Link>
                    <div className="pledge-desc">Split your contribution evenly between all Movement 2016 groups in purple states.</div>
                  </div>
                </div>
                <div className="pledge-col col s12 m4">
                  <div className="pledge">
                    <Link className="pledge-button btn waves-effect waves-light" to="/groups">Customized</Link>
                    <div className="pledge-desc">Custom plan your giving. Filter groups by state, issue area, or nonprofit tax status.</div>
                  </div>
                </div>
                <div className="pledge-col col s12 m4">
                  <div className="pledge">
                    <Link className="pledge-button btn waves-effect waves-light" to="https://movement2016.org/talk-to-a-human">Talk To A Human</Link>
                    <div className="pledge-desc">Our team provides free research on states and organizations based on your priorities. Awesome!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="testimonial-section">
          <div className="row">
            <div className="col s12 m6 l3">
              <div className="testimonial">
                <div className="testimonial-content">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</div>
                <div className="testimonial-author">- Steve Baliwag</div>
              </div>
            </div>
          <div className="col s12 m6 l3">
              <div className="testimonial">
                <div className="testimonial-content">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</div>
                <div className="testimonial-author">- Steve Baliwag</div>
              </div>
            </div>
          <div className="col s12 m6 l3">
              <div className="testimonial">
                <div className="testimonial-content">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</div>
                <div className="testimonial-author">- Steve Baliwag</div>
              </div>
            </div>
          <div className="col s12 m6 l3">
              <div className="testimonial">
                <div className="testimonial-content">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</div>
                <div className="testimonial-author">- Steve Baliwag</div>
              </div>
            </div>
          </div>
        </section>
        <section className="volunteer-section">
        </section>
        <section className="map-section">
          <div className="container">
            <StateMap />
          </div>
        </section>
      </main>

    );
  }
}

module.exports = HomePage;
