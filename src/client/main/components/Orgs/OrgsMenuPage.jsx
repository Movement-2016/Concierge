import React from 'react';
import { Link } from 'react-router';
import { ContextFromService } from '../ContextMixins';

import Loading from '../Loading.jsx';

function BrowseLink(props) {
  const {title, slug, count} = props;

  return (
    <Link className="orgs-link" to={'/groups/' + slug}>
      <div className="container">
        <span className="link-title">{title}</span>
        <span className="link-count">{count}</span>
      </div>
    </Link>
  );
}

class OrgsMenuPage extends ContextFromService(React.Component) {

  get servicePropNames() {
    return ['states'];
  }

  render() {

    if (this.state.loading) {
      return <Loading />;
    }

    const {
      colorSectionsDict,
      statesDict,
      numGroups,
    } = this.service;

    const colorKeys = Object.keys(colorSectionsDict);
    const statesKeys = Object.keys(statesDict);
    statesKeys.splice( statesKeys.indexOf('national'), 1);

    const title = 'Browse Groups';

    return (
      <main className="orgs-menu-page">
        <h1 className="page-title">{title}</h1>
        <div className="orgs-link-section">
          <BrowseLink title="See All Groups" slug="all-groups" count={numGroups}/>
        </div>
        <div className="orgs-link-section">
          { colorKeys.map( c => {
            return <BrowseLink title={colorSectionsDict[c].name} key={c} slug={c} count={colorSectionsDict[c].count} />;
          })}
        </div>
        <div className="orgs-link-section">
          { statesKeys.map( s => {
            return <BrowseLink title={statesDict[s].name} key={s} slug={s} count={statesDict[s].count} />;
          })}
        </div>
      </main>
    );
  }
}

module.exports = OrgsMenuPage;
