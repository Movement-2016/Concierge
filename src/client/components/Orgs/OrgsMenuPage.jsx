import React from 'react';
import { connect } from 'react-redux';
import Link from '../../services/LinkToRoute';

const BrowseLink = ({title, slug, count}) =>
    <Link className="orgs-link" to={'/groups/' + slug}>
      <div className="container">
        <span className="link-title">{title}</span>
        <span className="link-count">{count}</span>
      </div>
    </Link>
;

const PAGE_TITLE = 'Browse Groups';

const removeNational = arr => {
  const statesKeys = [ ...arr ];
  statesKeys.splice( statesKeys.indexOf('national'), 1);
  return statesKeys;
};

const _OrgsMenuPage = ({
        colorSectionsDict,
        statesDict,
        numGroups,     
        colorKeys,
        statesKeys 
      }) => <main className="orgs-menu-page">
              <h1 className="page-title">{PAGE_TITLE}</h1>
              <div className="orgs-link-section">
                <BrowseLink title="See All Groups" slug="all-groups" count={numGroups}/>
              </div>
              <div className="orgs-link-section">
                {colorKeys.map( c => <BrowseLink title={colorSectionsDict[c].name} key={c} slug={c} count={colorSectionsDict[c].count} />)}
              </div>
              <div className="orgs-link-section">
                {statesKeys.map( s => <BrowseLink title={statesDict[s].name} key={s} slug={s} count={statesDict[s].count} />)}
              </div>
            </main>
;

const mapStateToProps = ({
  router: {
    target: {
      model: {
        colorSectionsDict,
        statesDict,
        numGroups
      }
    }
  }

}) => ({
  colorSectionsDict,
  statesDict,
  numGroups,
  colorKeys: Object.keys(colorSectionsDict),
  statesKeys: removeNational(Object.keys(statesDict))
});

const OrgsMenuPage = connect( mapStateToProps )(_OrgsMenuPage);

module.exports = OrgsMenuPage;
