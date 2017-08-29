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

const _OrgsMenuPage = ({
        states,
        colors,
        numGroups,     
      }) => <main className="orgs-menu-page">
              <h1 className="page-title">{PAGE_TITLE}</h1>
              <div className="orgs-link-section">
                <BrowseLink title="See All Groups" slug="all-groups" count={numGroups}/>
              </div>
              {
                [colors,states].map( (str,n) => 
                  <div key={n} className="orgs-link-section">
                    {str.map( ({name,slug,count}) => <BrowseLink title={name} key={slug} slug={slug} count={count} /> )}
                  </div>
                  )
              }
            </main>
;

const mapStateToProps = ({
  router: {
    target: {
      model: {
        db
      }
    }
  }

}) => ({
  states: db.states.filter( state => state.slug !== 'national' ),
  colors: db.colors,
  numGroups: db.groups.length
});

const OrgsMenuPage = connect( mapStateToProps )(_OrgsMenuPage);

module.exports = OrgsMenuPage;
