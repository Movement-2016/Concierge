/* eslint "react/jsx-closing-bracket-location":"off" */
import React    from 'react';
import { Link } from 'react-router';

const ActBlueUrl = 'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage';
const TravelUrl  = 'https://docs.google.com/forms/d/e/1FAIpQLSfH_n5RoI7DZbQpZ739Fm5-8_hjUHt4YIGSlrg6_wWRnNvrkw/viewform';

const Tile = props => {

  const { linkto, href, glyph, img, text } = props;

  const icon     = glyph 
                     ? <i className={`glyphicon glyphicon-${glyph} tile-icon tile-glyph`} />
                     : <img src={img} className="tile-img tile-glyph" />;

  const iconlink = linkto
                    ? <Link to={linkto}>{icon}</Link>
                    : <a href={href}>{icon}</a>;

  const link     = linkto
                    ? <Link to={linkto} className="btn btn-primary">{text}</Link>
                    : <a href={href} className="btn btn-primary">{text}</a>;

  return (
      <div className="tile">
        {iconlink}
        <div className="tile-desc">{props.children}</div>
        {link}
      </div>
    );
};

const HomePage = () => {

  const introStyle = {
    backgroundImage: 'url("/images/photos/hands.jpg")',
    backgroundSize: 'cover',
    backgroundPositionY: 'top',
    backgroundRepeat: 'no-repeat',
  };

  return (
  <main className="homeArea" style={introStyle}>
    <div className="intro container-fluid" >

      <div className="intro-text text-center">Support the Best Community-Based<br />Vote Groups in the Country</div>

      <div className="row content-area">
        <div className="col-md-3 col-md-offset-1">
          <Tile href={ActBlueUrl} glyph="ok" text="Donate Easy">
            Split your contribution evenly between Movement 2016 groups
          </Tile>
        </div>
        <div className="col-md-3">
          <Tile linkto="/plan" img="/images/photos/murika.png" text="Donate Customized">  
            Create your own giving plan
          </Tile>
        </div>
        <div className="col-md-3">
          <Tile linkto="/getintouch" glyph="phone" text="Talk to a Human">
            Get research on states and organizations
          </Tile>
        </div>
      </div>

      <div className="row content-area">
        <div className="col-md-3 col-md-offset-1">
          <Tile href={TravelUrl} glyph="plane" text="Travel">
            Volunteer to travel and work in a purple state
          </Tile>
        </div>
        <div className="col-md-3">
          <Tile linkto="/plan" glyph="glass" text="Host a Party">
            Create your own donor house party
          </Tile>
        </div>
        <div className="col-md-3">
          <Tile linkto="/aboutus" glyph="info-sign" text="About Us">
            Learn more about the hows and whys of Movement 2016
          </Tile>
        </div>
      </div>

    </div>
  </main>
  );
};

module.exports = HomePage;
