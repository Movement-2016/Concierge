import React    from 'react';
import { Link } from 'react-router';

import { ServiceContext } from './ContextMixins.js';
import ContentPage from './ContentPage.jsx';
import Loading from './Loading.jsx';

const PlanLinkBox = () => {
  return (
      <div className="plan-link-box hide-on-small-and-down">
        <p>Create your own custom donation plan by browsing all the groups we work with.</p>
        <Link className="btn btn-primary btn-sm" to="/groups">Create Custom Plan</Link>
      </div>
    );
};

class TandemForms extends React.Component {
  render() {
    const { tandemForms } = this.props;

    return(
      <div className="row">
          {tandemForms.map( t => (
            <div key={t.id} className="col s12 m6 l3">
              <div className="tandem-form">
                <h4 className="title"  dangerouslySetInnerHTML={{__html:t.label}} />
                <div className="content" dangerouslySetInnerHTML={{__html:t.body}} />
                <a className="url btn" href={t.url}>Donate</a>
              </div>
            </div>            
          ))}
        </div>
      );
  }
}

class DonatePage extends ServiceContext(React.Component) {

  stateFromStore(storeState) {
    storeState.service.tandemForms.then( unsorted => {
      const tandemForms = [ ...unsorted ].sort( (a,b) => a.placement > b.placement ? 1 : -1 );
      this.setState({ tandemForms, loading: false });
    });
    this.setState({ loading: true });
  }

  render() {
    const { 
      tandemForms, 
      loading 
    } = this.state;

    return(
      <div>
        <PlanLinkBox />
        <ContentPage.Shell name="donate" title="Easy Donate">
        {loading
          ? <Loading />
          : <TandemForms tandemForms={tandemForms} />
        }
        </ContentPage.Shell>
      </div>
      );
  }
}

module.exports = DonatePage;