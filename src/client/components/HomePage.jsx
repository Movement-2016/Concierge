import React               from 'react';
import { connect }         from 'react-redux';
import StateMap            from './StateMap.jsx';
import Thermometer         from './Thermometer.jsx';
import SocialButtons       from './Social.jsx';
import Tile                from './Tile.jsx';
import DonateTiles         from './DonateTiles.jsx';

/* eslint-disable react/no-danger */

const Testimonial = ({
      author,
      body,
      image,
      title
    }) => <div className="testimonial flex-item">
            <div className="testimonial-content" dangerouslySetInnerHTML={{__html:body}} />
            <div className="author-area">
              <div className="author-pic" style={image?{ backgroundImage: 'url("' + image + '")' }:{}} />
              <div className="author-info">
                <div className="author-name">{author}</div>
                <div className="author-title">{title}</div>
              </div>
            </div>
          </div>
;

const Testimonials = ({testimonials}) =>
      <div className="testimonials flex-container">
        {testimonials.map( (t,i) => <Testimonial key={i} {...t} /> )}
      </div>
;

const NewsTiles = ({news}) => 
      <div className="news-tiles">
        {news.map( (n, i) => <Tile key={i} {...n} /> )}
      </div>
;

const StateMapBound = ({states,}) => 
        global.IS_SERVER_REQUEST
            ? <span />
            : <div className="container">
                <h2 className="section-title">{'Find a Group'}</h2>
                <div className="map-desc">{'Click the map to browse the groups in each state.'}</div>
                <StateMap dataSource={states} />
              </div>
;

const AuthCode = ({code}) => <p style={{margin:30}} className="well auth-code"><h2>{'Auth code: '}<b>{code}</b></h2></p>;

const _HomePage = ({
      authCode,
      tag_line,
      description,
      groupNumber,
      goal,
      current,
      model: {
        donateTiles,
        states,
        testimonials,
        news 
      }
    }) => authCode 
          ? <AuthCode code={authCode} />
          : <main className="home">
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
                  <h2 className="section-title">{'Choose a Way to Give'}</h2>
                  <DonateTiles tiles={donateTiles} />
                </div>
              </section>
              <section className="map-section">
                <StateMapBound states={states} />
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
;

const mapStateToProps = ({ 
  router: { 
    target: { 
      model, 
      model: { 
        page: {
          tag_line,
          homepage_description: description,
          number_groups_donated: groupNumber,
          goal,
          current
        }
      },
    },
    route: {
      queryParams: {
        code: authCode = ''
      }
    }
  }
}) => ({tag_line,description,groupNumber,goal,current,model,authCode});

const HomePage = connect(mapStateToProps)( _HomePage );

module.exports = HomePage;
