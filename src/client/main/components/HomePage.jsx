import React      from 'react';
import { Link } from 'react-router';
import StateMap from './StateMap.jsx';

import { ServiceContext }  from './ContextMixins.js';
import { Thermometer }  from './DonateHeader.jsx';
import commaize         from 'commaize';

import SocialButtons from './Social.jsx';
import Loading from './Loading.jsx';

import '../../lib/carousel';

class Testimonials extends React.Component {
  componentDidMount() {
    /* globals $ */
    setTimeout( () => $('.testimonial-section .carousel').carouselX({full_width: true}),
                200 );
  }

  render() {
    const { testimonials } = this.props;

    return (
        <section className="testimonial-section">
            <div className="carousel carousel-slider center" data-indicators="true">
              {testimonials.map( (t,i) => (
                <div key={i} className="carousel-item">
                  <div className="testimonial">
                    <div className="testimonial-content" dangerouslySetInnerHTML={{__html: '"' + t.quote + '"'}} />
                    <div className="testimonial-author"  dangerouslySetInnerHTML={{__html:t.testifier}} />
                  </div>
                </div>            
              ))}
            </div>
        </section>
      );
  }
}

class HomePage extends ServiceContext(React.Component) {

  stateFromStore( storeState ) {

    const {
      donateStats,
      testimonials
    } = storeState.service;

    Promise
      .all( [ donateStats, testimonials ] )
      .then( ([ donateStats, testimonials ]) => this.setState( { donateStats, testimonials, loading: false } ));

    this.setState({ loading: true });
  }

  render() {
    const { 
      donateStats,
      donateStats: {
        goal,
        pledged
      } = {},
      testimonials,
      loading
    } = this.state;

    if( loading ) {
      return <Loading />;
    }

    return(
      
      <main className="home">
        <section className="donate-section">
          <div className="container">
            <h1 className="intro-text">Support the best Community-Based Vote&nbsp;Groups&nbsp;in&nbsp;the&nbsp;Country</h1>
            <div className="pledge-box">
              <div className="pledge-box-title">Choose A Way To Give</div>
              <div className="thermometer-area">
                <Thermometer {...donateStats} />
                <div className="thermometer-numbers">
                  <div className="thermometer-current">{'$' + commaize(pledged) + ' Pledged'}</div>
                  <div className="thermometer-goal">{'$' + commaize(goal) + ' Goal'}</div>
                </div>
              </div>
              <div className="pledge-area row">
                <div className="pledge-col col s12 m4">
                  <div className="pledge">
                    <Link className="pledge-button btn waves-effect waves-light" to="/donate">Easy Donate</Link>
                    <div className="pledge-desc">Give to Movement 2016 groups quickly using a donation template, or create your own plan.</div>
                  </div>
                </div>
                <div className="pledge-col col s12 m4">
                  <div className="pledge hide-on-small-and-down">
                    <Link className="pledge-button btn waves-effect waves-light" to="/groups">Browse Groups</Link>
                    <div className="pledge-desc">Browse all Movement 2016 groups. Filter groups by state, issue area, or nonprofit tax status.</div>
                  </div>
                  <div className="pledge hide-on-med-and-up">
                    <Link className="pledge-button btn waves-effect waves-light" to="/groups/mobile">Browse Groups</Link>
                    <div className="pledge-desc">Customize your giving. Filter groups by state.</div>
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
        <Testimonials testimonials={testimonials} />
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
