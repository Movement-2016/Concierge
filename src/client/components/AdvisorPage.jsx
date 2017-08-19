import React              from 'react';
import { connect }        from 'react-redux';
import { Shell }          from './ContentPage.jsx';

const NUM_COLS = 3;

const processAdvisors = advisors => {
  const arr = [ ...advisors ];

  const modulo = arr.length % NUM_COLS;

  if( modulo ) {
    for( var i = 0; i < NUM_COLS - modulo; i++ ) {
      arr.push( { name: '', sort: 'zzzzz' } );
    }
  }

  return arr.sort( (a,b) => a.sort.localeCompare(b.sort) ).map( a => a.name );
};

const sliceAdvisors = advisors => {
  const itemsPerCol = Math.trunc(advisors.length/NUM_COLS);

  const cols = new Array( NUM_COLS )
                .fill(true)
                .map( (a,i) => advisors.slice(i*itemsPerCol,Math.max(i*itemsPerCol+itemsPerCol)) );
  return cols;
};

/* eslint-disable react/no-danger */
const renderAdvisorColumn = (arr,index) =>       
  <div key={index} className="col s12 m4">
    <ul>
      {arr.map((n,i) => <li key={i} dangerouslySetInnerHTML={{__html:n}} />) } 
    </ul>
  </div>
;

const _AdvisorPage = ({advisors}) => 
  <Shell title="Advisory Board" name="advisors">
    <div className="content">
      <div className="row">
        {advisors.map( renderAdvisorColumn )}
      </div>
    </div>
  </Shell>
;

const mapStoreToProps = ({
  router: {
    target: {
      model: {
        advisors
      }
    }
  }
}) => ({ advisors: sliceAdvisors( processAdvisors(advisors) ) });

const AdvisorPage = connect( mapStoreToProps )(_AdvisorPage);

module.exports = AdvisorPage;
