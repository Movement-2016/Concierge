import React from 'react';
import { Link } from 'react-router';


// TODO: This data should be at the WP Engine site as custom exportable fields
const groups = [
  {
    title: 'Purple States',
    desc:  'Spread out donations to all purple states',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Purple States (501c3)',
    desc:  'Spread out tax deductable donations to all purple states',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Florida',
    desc:  'Spread out donations to organizations in Florida',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Ohio',
    desc:  'Spread out donations to organizations in Ohio',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Focus Voter ID Laws (501c3)',
    desc:  'Spread out tax deductable donations organizations dealing with new voter ID laws',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Get Out the Purple Vote',
    desc:  'Give to organizations focused on voter turnout in purple states',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Immigration',
    desc:  'Give to organizations focused on issues related to immigration',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Environment',
    desc:  'Spread out tax deductable donations to all purple states',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Environment',
    desc:  'Spread out tax deductable donations to all purple states',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
];

const Tile = ({ title, desc, url }) => {

  return (
    <li className="tile">
      <div className="title">{title}</div>
      <div className="desc">{desc}</div>
      <a href={url} className="btn btn-primary donate-button">Give Now</a>
    </li>
  );
};

const PlanLinkBox = () => {
  return (
      <div className="plan-link-box">
        <p>If you like you can create your own custom donation plan by browsing all the groups we work with.</p>
        <Link className="btn btn-primary btn-sm" to="/plan">Create Custom Plan</Link>
      </div>
    );
};

class DonatePage extends React.Component {

  render() {

    return (
        <div className="donatePage">
          <PlanLinkBox />
          <h1>Easy Donation</h1>
          <ul className="easy-donations">
            {groups.map( (g,i) => <Tile key={i} {...g} />)}
          </ul>
        </div>
      );
  }

}

module.exports = DonatePage;