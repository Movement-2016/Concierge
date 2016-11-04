import React    from 'react';
import { Link } from 'react-router';
import StateMap from './StateMap.jsx';

import { ServiceContext }  from './ContextMixins.js';
import { Thermometer }     from './DonateHeader.jsx';
import commaize            from 'commaize';
import SocialButtons       from './Social.jsx';
import Loading             from './Loading.jsx';

import '../../lib/carousel';

class Testimonials extends React.Component {


  render() {
    const { testimonials } = this.props;

    return (
        <section className="testimonial-section container">
            <div className="row">
              {testimonials.map( (t,i) => (
                <div key={i} className="col m4">
                  <div className="testimonial">
                    <div className="testimonial-content" dangerouslySetInnerHTML={{__html: '"' + t.quote + '"'}} />
                  </div>
                </div>            
              ))}
            </div>
        </section>
      );
  }
}

class ThermometerSection extends React.Component {

  render() {
    const { 
      donateStats,
      donateStats: {
        goal,
        pledged
      } = {},
    } = this.props;

    return Number(goal) 
      ? (
          <div className="thermometer-area">
            <Thermometer {...donateStats} />
            <div className="thermometer-numbers">
              <div className="thermometer-current">{'$' + commaize(pledged) + ' Pledged'}</div>
              <div className="thermometer-goal">{'$' + commaize(goal) + ' Goal'}</div>
            </div>
          </div>    
        )
      : null;
  }
}

class TileBox extends React.Component {
  render() {
    const {
      content,
      title,
      url,
      display
    } = this.props;
    return (
        <div className={'pledge-col col s12 m4 ' + display}>
          <div className='pledged'>
            <Link className="pledge-button btn waves-effect waves-light" to={url}>{title}</Link>
            <div className="pledge-desc" dangerouslySetInnerHTML={{__html:content}} />
          </div>
        </div>
      );
  }
}

class TileBoxes extends React.Component {

  render() {
    const { tiles } = this.props;

    return (
        <div className="pledge-area row">
          {tiles.map( (box,i) => <TileBox key={i} {...box} />)}
        </div>
      );
  }
}

class HomePage extends ServiceContext(React.Component) {

  stateFromStore( storeState ) {

    const {
      donateStats,
      testimonials,
      homeContent
    } = storeState.service;

    Promise
      .all( [ 
        donateStats, 
        testimonials,
        homeContent ] )
      .then( ([ donateStats, testimonials, homeContent ]) => this.setState( { 
        donateStats, 
        testimonials, 
        homeContent,
        loading: false 
      } ));

    this.setState({ loading: true });
  }

  render() {
    const { 
      donateStats,
      testimonials,
      loading,
      homeContent: {
        fields: {
          tag_line,
          give_box_title,
          box,
          states_spreadsheet
        } = {}
      } = {}

    } = this.state;

    if( loading ) {
      return <Loading />;
    }

    return(
      
      <main className="home">
        <section className="donate-section">
          <div className="container">
            <h1 className="intro-text" dangerouslySetInnerHTML={{__html:tag_line}}  />
            <div className="pledge-box">
              <div className="pledge-box-title">{give_box_title}</div>
              <ThermometerSection donateStats={donateStats}/>
              <TileBoxes tiles={box} />
            </div>
            <SocialButtons />
          </div>
        </section>
        <Testimonials testimonials={testimonials} />
        <section className="volunteer-section" />
        <section className="map-section hide-on-small-and-down">
          <div className="container">             
            <StateMap dataSource={states_spreadsheet} />
          </div>
        </section>
      </main>

    );
  }
}

module.exports = HomePage;
