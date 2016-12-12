import React    from 'react';
import { Link } from 'react-router';
import StateMap from './StateMap.jsx';

import { ServiceContext }  from './ContextMixins.js';
import { Thermometer }     from './DonateHeader.jsx';
import commaize            from 'commaize';
import SocialButtons       from './Social.jsx';
import Loading             from './Loading.jsx';

class NewsArticle extends React.Component {


  render() {
    const { 
      title,
      content,
      excerpt,
      date,
     } = this.props;

      return (
        <div className="col s12 m4">
          <div className="news-article">
            <div className="news-article-content" dangerouslySetInnerHTML={{__html: content }} />
          </div>
        </div>
      );
  }
}

class News extends ServiceContext(React.Component) {

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
              {news.map( (article,i) => <NewsArticle key={i} {...article} /> )};
            </div>
        </section>
      );
  }
}

class Testimonial extends React.Component {


  render() {
    const { 
      title,
      content,
      image, // <= this is URL
      authorTitle      
     } = this.props;

      return (
        <div className="col s12 m4">
          <div className="testimonial">
            <div className="testimonial-content" dangerouslySetInnerHTML={{__html: content }} />
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
        <section className="testimonial-section container">
            <div className="row">
              {testimonials.map( (t,i) => <Testimonial key={i} {...t} /> )};
            </div>
        </section>
      );
  }
}

class TileBox extends React.Component {
  render() {
    const {
      content,
      title,
      url,
      image, // << this is an URL
      display
    } = this.props;
    var isRemote = /^http/.test(url);
    return (
        <div className={'pledge-col col s12 m4 ' + display}>
          <div className='pledge'>
            {isRemote
              ? <a className="pledge-button btn waves-effect waves-light" href={url}>{title}</a>
              : <Link className="pledge-button btn waves-effect waves-light" to={url}>{title}</Link>
            }            
            <div className="pledge-desc" dangerouslySetInnerHTML={{__html:content}} />
          </div>
        </div>
      );
  }
}

class TileBoxes extends ServiceContext(React.Component) {

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
        <div className="pledge-area row">
          {tiles.map( (box,i) => <TileBox key={i} {...box} />)}
        </div>
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
        <section className="donate-section">
          <div className="container">
            <h1 className="intro-text" dangerouslySetInnerHTML={{__html:tag_line}}  />
            <div className="pledge-box">
              <div className="pledge-box-title">{give_box_title}</div>
              <ThermometerSection donateStats={donateStats}/>
              <TileBoxes />
            </div>
            <SocialButtons />
          </div>
        </section>
        <Testimonials />
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
