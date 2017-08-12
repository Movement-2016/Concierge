import React              from 'react';
import { connect }        from 'react-redux';
import { Shell }          from './ContentPage.jsx';

const nameRegex = /[a-z-]+$/i;

const processAdvisors = advisors =>
        advisors && advisors.map( a => a.post_title )
                                .sort( (a,b) => a.match(nameRegex)[0].localeCompare(b.match(nameRegex)[0]) );


const sliceAdvisors = advisors => {
  const NUM_COLS = 3;

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
      {arr.map(n => <li key={n} dangerouslySetInnerHTML={{__html:n}} />) } 
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
