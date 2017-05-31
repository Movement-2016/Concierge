import React              from 'react';
import { Shell }          from './ContentPage.jsx';
import { ContextFromService } from './ContextMixins';
import Loading            from './Loading.jsx';

const nameRegex = /[a-z-]+$/i;

const processAdvisors = advisors =>
        advisors && advisors.map( a => a.post_title )
                                .sort( (a,b) => a.match(nameRegex)[0].localeCompare(b.match(nameRegex)[0]) );

class AdvisorPage extends ContextFromService(React.Component) {

  get servicePropNames() {
    return ['advisors'];
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
    let { loading, advisors } = this.state;

    advisors = processAdvisors(advisors);

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

AdvisorPage.preload = storeState => storeState.service.content.then( () => storeState.service.advisors);

module.exports = AdvisorPage;
