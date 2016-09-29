import React from 'react';
import { Shell } from './ContentPage.jsx';
import { ServiceContext } from './ContextMixins';
import Loading from './Loading.jsx';

class AdvisorPage extends ServiceContext(React.Component) {

  constructor() {
    super(...arguments);
    this.state = { advisors: '', loading: true };
  }

  stateFromStore(storeState) {
    storeState.service.advisors.then( ({advisors}) => {
      const sorted = [ ...advisors].sort( (a,b) => a.match(/[a-z-]+$/i)[0].localeCompare(b.match(/[a-z-]+$/i)[0]) );
      this.setState({ advisors: sorted, loading: false });
    });
  }

  sliceAdvisors(advisors) {
    const NUM_COLS = 3;

    const itemsPerCol = Math.trunc(advisors.length/NUM_COLS);

    const cols = new Array( NUM_COLS )
                  .fill(true)
                  .map( (a,i) => advisors.slice(i*itemsPerCol,Math.max(i*itemsPerCol+itemsPerCol)) );

    return cols;
  }

  renderAdvisorColumn(arr,index) {
    return (
      <div key={index} className="col m4">
        <ul>
          {arr.map(n => <li key={n} dangerouslySetInnerHTML={{__html:n}} />)}
        </ul>
      </div>);
  }

  render() {
    const { loading, advisors } = this.state;

    return (
      <Shell title="Advisory Board" name="advisors">
        <div className="content">
          {loading
            ? <Loading />
            : <div className="row">
                {this.sliceAdvisors(advisors).map( this.renderAdvisorColumn )}
              </div>
          }
        </div>
      </Shell>
    );

  }
}


module.exports = AdvisorPage;
