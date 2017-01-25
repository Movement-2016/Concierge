import React               from 'react';

import { ServiceContext }  from './ContextMixins.js';
import StateMap            from './StateMap.jsx';
import Thermometer         from './Thermometer.jsx';
import SocialButtons       from './Social.jsx';
import Tile                from './Tile.jsx';
import Loading             from './Loading.jsx';
import DonateTiles         from './DonateTiles.jsx';

import scrollToElement from '../../lib/scrollToElement';

class Testimonial extends React.Component {
  render() {
    const {
      post_title: title,
      post_content: content,
      fields: {
        image,
        author_title: authorTitle
      }
    } = this.props;

    const authorPicStyle = image
      ? { backgroundImage: 'url("' + image + '")' }
      : {};

    return (
      <div className="testimonial flex-item">
        <div className="testimonial-content">{content}</div>
        <div className="author-area">
          <div className="author-pic" style={authorPicStyle} />
          <div className="author-info">
            <div className="author-name">{title}</div>
            <div className="author-title">{authorTitle}</div>
          </div>
        </div>
      </div>
    );
  }
}


class Testimonials extends ServiceContext(React.Component) {

  stateFromStore( storeState ) {

    storeState.service.testimonials.then( testimonials => this.setState( { testimonials, loading: false  }));

    this.setState({ loading: true });
  }

  render() {
    const {
      testimonials,
      loading
    } = this.state;

    if( loading ) {
      return null;
    }

    return (
      <div className="testimonials flex-container">
        {testimonials.map( (t,i) => <Testimonial key={i} {...t} /> )}
      </div>
    );
  }
}

class NewsTiles extends ServiceContext(React.Component) {

  stateFromStore( storeState ) {
    storeState.service.news.then( news => this.setState( { news, loading: false  }));
    this.setState({ loading: true });
  }

  render() {
    const {
      news,
      loading
    } = this.state;

    if( loading ) {
      return null;
    }

    return (
      <div className="news-tiles">
        {news.map( (n, i) => <Tile key={i} {...n} /> )}
      </div>
    );
  }
}

class HomePage extends ServiceContext(React.Component) {

  componentDidMount() {    
    if( location.hash ) {
      setTimeout( () => {
        const elemName = location.hash.replace('#','');
        const elem = document.getElementById(elemName);
        elem && setTimeout( () => scrollToElement('#' + elemName), 100 );
      }, 200);
    }
  }

  stateFromStore( storeState ) {

    var home   = storeState.service.getPage('home');
    var states = storeState.service.states;
    var colors = storeState.service.stateColors;

    Promise
      .all(   [ states, home, colors  ])
      .then( ([ states, home, colors ]) => this.setState( { states, home, colors, loading: false }));

    this.setState({ loading: true });
  }

  render() {
    const {
      loading,
      states,
      colors,
      home: {
        fields: {
          tag_line,
          goal,
          current
        } = {}
      } = {}

    } = this.state;

    if( loading ) {
      return <Loading />;
    }

    return(

      <main className="home">
        <section className="intro-section">
          <div className="container">
            <h1 className="intro-text" dangerouslySetInnerHTML={{__html:tag_line}}  />
            <Thermometer goal={goal} current={current} />
            <SocialButtons />
          </div>
        </section>
        <a name="donate" />
        <section className="donate-section" id="donate">
          <div className="container">
            <h2 className="section-title">Three Ways to Donate</h2>
            <DonateTiles />
          </div>
        </section>
        <section className="map-section">
          <div className="container">
            <h2 className="section-title">Find a Group</h2>
            <div className="map-desc">Click the map to browse the groups in each state.</div>
            <StateMap dataSource={states} colors={colors} />
          </div>
        </section>
        <section className="testimonial-section">
          <div className="container">
            <Testimonials />
          </div>
        </section>
        <section className="news-section">
          <div className="container">
            <NewsTiles />
          </div>
        </section>
      </main>

    );
  }
}

module.exports = HomePage;

