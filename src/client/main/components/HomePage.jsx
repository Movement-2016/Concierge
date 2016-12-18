import React    from 'react';
import { Link } from 'react-router';
import StateMap from './StateMap.jsx';

import { ServiceContext }  from './ContextMixins.js';
import Thermometer         from './Thermometer.jsx';
import SocialButtons       from './Social.jsx';
import Tile                from './Tile.jsx';
import commaize            from 'commaize';
import Loading             from './Loading.jsx';



class Testimonial extends React.Component {
  render() {
    const {
      title,
      content,
      image, // <= this is URL
      authorTitle
    } = this.props;

    const authorPicStyle = image
      ? { background: 'url("' + image + '")' }
      : {}

    return (
      <div className="testimonial">
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
      <div className="testimonials">
        {testimonials.map( (t,i) => <Testimonial key={i} {...t} /> )}
      </div>
    );
  }
}



class DonateTiles extends ServiceContext(React.Component) {

  stateFromStore( storeState ) {

    storeState.service.donateTiles.then( tiles => this.setState( { tiles, loading: false  }));

    this.setState({ loading: true });
  }

  render() {
    const {
      tiles,
      loading
    } = this.state;

    if( loading ) {
      return null;
    }

    return (
        <div className="donate-tiles">
          {tiles.map( (d, i) => <Tile key={i} {...d} />)}
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
        <section className="news-section container">
            <div className="row">
              {news.map( (n, i) => <Tile key={i} {...n} /> )};
            </div>
        </section>
      );
  }
}

class HomePage extends ServiceContext(React.Component) {

  stateFromStore( storeState ) {

    const {
      donateStats,
      homeContent
    } = storeState.service;

    Promise
      .all(   [ donateStats, homeContent ])
      .then( ([ donateStats, homeContent ]) => this.setState( { donateStats, homeContent, loading: false } ));

    this.setState({ loading: true });
  }

  render() {
    const {
      donateStats,
      loading,
      homeContent: {
        fields: {
          tag_line,
          give_box_title,
          states_spreadsheet
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
            <Thermometer {...donateStats} />
            <SocialButtons />
          </div>
        </section>
        <section className="donate-section">
          <div className="container">
            <h2 className="section-title">Ways to Donate</h2>
            <DonateTiles />
          </div>
        </section>
        <section className="map-section hide-on-small-and-down">
          <div className="container">
            <h2 className="map-title">Find a Group</h2>
            <div className="map-desc">Click the map to browse the groups in each state.</div>
            <StateMap dataSource={states_spreadsheet} />
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
