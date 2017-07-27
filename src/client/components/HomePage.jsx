import React               from 'react';

import StateMap            from './StateMap.jsx';
import Thermometer         from './Thermometer.jsx';
import SocialButtons       from './Social.jsx';
import Tile                from './Tile.jsx';
import DonateTiles         from './DonateTiles.jsx';

import scrollToHash     from '../lib/scrollToHash';

const SCROLL_DELAY = 100;

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

    /* eslint-disable react/no-danger */
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


class Testimonials extends React.Component {

  render() {
    const {
       testimonials
    } = this.props;

    return (
      <div className="testimonials flex-container">
        {testimonials.map( (t,i) => <Testimonial key={i} {...t} /> )}
      </div>
    );
  }
}

class NewsTiles extends React.Component {

  render() {
    const {
      news,
    } = this.props;

    return (
      <div className="news-tiles">
        {news.map( (n, i) => <Tile key={i} {...n} /> )}
      </div>
    );
  }
}

class StateMapBound extends React.Component {

  render() {
    if( global.IS_SERVER_REQUEST ) {
      return <span />;
    }

    let {
      states,
      colorSections,
    } = this.props;

    return (
        <div className="container">
          <h2 className="section-title">Find a Group</h2>
          <div className="map-desc">Click the map to browse the groups in each state.</div>
          <StateMap dataSource={states} colors={colorSections} />
        </div>
      );

  }
}

class AuthCode extends React.Component {

  render() {
    const {
      code
    } = this.props;

    return (
        <p style={{margin:30}} className="well auth-code"><h2>Auth code: <b>{code}</b></h2></p>
      );
  }
}

class HomePage extends React.Component {

  componentDidMount() {
    scrollToHash(0,SCROLL_DELAY);
  }

  componentDidUpdate() {
    scrollToHash(0,SCROLL_DELAY);
  }
  
  render() {

    if( this.props.queryParams && this.props.queryParams.code ) {
      return <AuthCode code={this.props.queryParams.code} />;
    }

    const {
      page: {
        fields: {
          tag_line,
          homepage_description: description,
          number_groups_donated: groupNumber,
          goal,
          current
        } = {}
      } = {},
      donateTiles,
      states,
      colorSections,
      testimonials,
      news

    } = this.props.model;

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
              <p dangerouslySetInnerHTML={{__html:description}} />
            </div>
          </div>
        </section>
        <a name="donate" />
        <section className="donate-section" id="donate">
          <div className="container">
            <h2 className="section-title">Choose a Way to Give</h2>
            <DonateTiles tiles={donateTiles} />
          </div>
        </section>
        <section className="map-section">
          <StateMapBound states={states} colorSections={colorSections} />
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
