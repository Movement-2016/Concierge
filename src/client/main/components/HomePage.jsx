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
        <div className="testimonial-content" dangerouslySetInnerHTML={{__html:content}} />
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

  get contextPropName() {
    return 'testimonials';
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

  get contextPropName() {
    return 'news';
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

  constructor() {
    super(...arguments);
    const {
      home,
      news,
      testimonials,
      donateTiles
    } = this.props;

    this.state = home ? { home, news, testimonials, donateTiles } : {};
  }

  componentDidMount() {
    if( location.hash ) {
      setTimeout( () => {
        const elemName = location.hash.replace('#','');
        const elem = document.getElementById(elemName);
        const SCROLL_DELAY = 100;
        elem && setTimeout( () => scrollToElement('#' + elemName), SCROLL_DELAY );
      }, 200);
    }
  }

  stateFromStore( storeState ) {

    if( this.state.home ) {
      return;
    }

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
      news,
      testimonials,
      donateTiles,
      home: {
        fields: {
          tag_line,
          homepage_description: description,
          number_groups_donated: groupNumber,
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
            <SocialButtons />
            <h1 className="intro-tagline">{tag_line}</h1>
            <Thermometer goal={goal} current={current} groupNumber={groupNumber} />
          </div>
          <div className="intro-description">
            <div className="container">
              <p>{description}</p>
            </div>
          </div>
        </section>
        <a name="donate" />
        <section className="donate-section" id="donate">
          <div className="container">
            <h2 className="section-title">Choose a Way to Give</h2>
            <DonateTiles donateTiles={donateTiles} />
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
            <Testimonials testimonials={testimonials} />
          </div>
        </section>
        <section className="news-section">
          <div className="container">
            <NewsTiles news={news} />
          </div>
        </section>
      </main>

    );
  }
}

module.exports = HomePage;
