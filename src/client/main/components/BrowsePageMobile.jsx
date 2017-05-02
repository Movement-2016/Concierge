import React from 'react';
import { Link } from 'react-router';

function BrowseLink(props) {
  const {title, slug, count} = props;

  return (
    <Link className="browse-link" to={'/groups/' + slug}>
      <div className="container">
        <span className="link-title">{title}</span>
        <span className="link-count">{count}</span>
      </div>
    </Link>
  );
}

class BrowsePageMobile extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  render() {

    const storeState = this.context.store.getState();
    const {statesDict, colorSectionsDict, numGroups, menu } = storeState.service;
    console.log(colorSectionsDict);

    const title = 'Browse Groups';

    return (
      <main className="browse-page-mobile">
        <h1 className="page-title">{title}</h1>
        <div className="browse-link-section">
          <BrowseLink title="See All Groups" slug="all-groups" count={numGroups}/>
        </div>
        <div className="browse-link-section">
          { Object.keys(colorSectionsDict).map( c => {
            return <BrowseLink title={colorSectionsDict[c].name} key={c} slug={c} count={colorSectionsDict[c].count} />
          })}
        </div>
        <div className="browse-link-section">
          { Object.keys(statesDict).map( s => {
            return <BrowseLink title={statesDict[s].name} key={s} slug={s} count={statesDict[s].count} />
          })}
        </div>
      </main>
    );
  }
}

module.exports = BrowsePageMobile;
