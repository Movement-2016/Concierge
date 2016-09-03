import React from 'react';
import { Link } from 'react-router';
import M2016Service from '../../m2016-service';

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
        <p>Create your own custom donation plan by browsing all the groups we work with.</p>
        <Link className="btn btn-primary btn-sm" to="/custom">Create Custom Plan</Link>
      </div>
    );
};

class DonatePage extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { loading: true };
  }

  componentWillMount() {
    M2016Service.init().then( service => {
      this.setState({ 
        loading: false, 
        forms: service.tandemForms
      });
    });
  }

  render() {
    const { forms, loading } = this.state;
    
    if( loading ) {
      return <div className="well">loading forms...</div>;
    }

    return (
        <div className="donatePage">
          <PlanLinkBox />
          <h1>Easy Donation</h1>
          <ul className="easy-donations">
            {forms.map( (g,i) => <Tile key={i} {...g} />)}
          </ul>
        </div>
      );
  }
}

module.exports = DonatePage;