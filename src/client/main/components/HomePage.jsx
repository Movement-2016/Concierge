/* eslint "react/jsx-closing-bracket-location":"off" */
/* eslint "react/no-unknown-property":"off" */

import React from 'react';

class Thermometer extends React.Component {

  render() {
    const mercuryStyle = {
      maxWidth: '9.0454%'
    };

    return (
        <div className="thermometerArea">
          <div className="thermometer">
            <div className="mercury" style={mercuryStyle} />
          </div>
          <div className="thermometer-numbers">
            <div className="thermometer-current">$904,540 Pledged</div>
            <div className="thermometer-goal">$10,000,000 Goal</div>
          </div>
        </div>
    );
  }
}


const FB_IFRAME_PLUGIN_QUERY ='app_id=301323636873436&amp;container_width=945&amp;href=http%3A%2F%2Fmovement2016.org%2F&amp;layout=button&amp;locale=en_US&amp;mobile_iframe=true&amp;sdk=joey&amp;size=large';

const fbPluginStyle = `
    vertical-align: 'bottom';
    width: 73px;
    height: 28;`;

const fbFrameStyle = `
    border: none;
    visibility: visible;
    width: 73px;
    height: 28px;
`;

const twitterStyle = `
    position: static;
    visibility: visible;
    width: 76px;
    height: 28px;
`;

const sharingHTML = `
      <div className="fb-share-button fb_iframe_widget" 
           data-href="http://movement2016.org" 
           data-layout="button" 
           data-size="large" 
           data-mobile-iframe="true" 
           fb-xfbml-state="rendered" 
           fb-iframe-plugin-query=${FB_IFRAME_PLUGIN_QUERY}><span style=${fbPluginStyle} ><iframe 
                name="f4f187e9cb3ca4" 
                width="1000px" 
                height="1000px" 
                frameBorder="0" 
                allowTransparency="true" 
                allowFullScreen="true" 
                scrolling="no" 
                title="fb:share_button Facebook Social Plugin" 
                src="/images/share/button.html" 
                style=${fbFrameStyle} /></span></div>
      <iframe id="twitter-widget-0" 
              scrolling="no" 
              frameBorder="0" 
              allowTransparency="true" 
              className="twitter-share-button twitter-share-button-rendered twitter-tweet-button" 
              title="Twitter Tweet Button" 
              src="/images/share/tweet_button.cc55ce010cf84cc9f5752aec264d23e3.en.html" 
              style=${twitterStyle} 
              data-url="http://movement2016.org" />
`;

const HomePage = () => {

  const introStyle = {
    backgroundImage: 'url("/images/photos/hands.jpg")',
    minHeight: 400,
    backgroundSize: 'cover',
    backgroundPositionY: 'top',
    backgroundRepeat: 'no-repeat',
  };

  return (
  <main className="homeArea" style={introStyle}>
    <div className="intro" >

      <h1 className="intro-text">Support the Best Community-Based<br />Vote Groups in the Country</h1>

      <div className="container-fluid">
    
          <div className="row">

            <div className="pledge-box-title">Choose A Way To Give</div>

            <Thermometer />
            <div className="pledge-area row">
              <div className="pledge-col col s12 m4">
                <div className="pledge">
                  <a className="pledge-button btn waves-effect waves-light" href="https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage">Easy</a>
                  <div className="pledge-desc">Split your contribution evenly between all Movement 2016 groups in purple states.</div>
                </div>
              </div>
              <div className="pledge-col col s12 m4">
                <div className="pledge">
                  <a className="pledge-button btn waves-effect waves-light" href="/contribution-planning">Customized</a>
                  <div className="pledge-desc">Custom plan your giving. Filter groups by state, issue area, or nonprofit tax status.</div>
                </div>
              </div>
              <div className=" pledge-col col s12 m4">
                <div className="pledge">
                  <a className="pledge-button btn waves-effect waves-light" href="/talk-to-a-human">Talk To A Human</a>
                  <div className="pledge-desc">Our team provides free research on states and organizations based on your priorities. Awesome!</div>
                </div>
              </div>
            </div>
          </div>

          <div className="social-buttons row">
            <div className="col-md-2 col-md-offset-4" dangerouslySetInnerHTML={{__html:sharingHTML}} />
          </div>
        </div>
      </div>
      </main>
    );
};

module.exports = HomePage;
