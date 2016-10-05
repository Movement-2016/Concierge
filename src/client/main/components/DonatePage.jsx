import React    from 'react';
import { Link } from 'react-router';

import { ServiceContext } from './ContextMixins.js';
import ContentPage from './ContentPage.jsx';
import Loading from './Loading.jsx';

const CustomForm = () => {
  return (
    <Link className="custom-form form-block" to="/groups">
      <div className="wrapper">
        <h3 className="form-title">Customized</h3>
        <div className="form-content">
          <p>Browse Movement 2016 groups to create your own customized donation plan</p>
        </div>
      </div>
    </Link>
  );
};

class TandemForms extends React.Component {
  render() {
    const { tandemForms } = this.props;

    return(
      <div className="row">
        {tandemForms.map( t => (
          <div key={t.id} className="col s12 m4">
            <a className="tandem-form form-block" href={t.url}>
              <div className="wrapper">
                <h3 className="form-title"  dangerouslySetInnerHTML={{__html:t.label}} />
                <div className="form-content" dangerouslySetInnerHTML={{__html:t.body}} />
              </div>
            </a>
          </div>            
        ))}
        <div className="col s12 m4">
          <CustomForm />
        </div>
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
        <ContentPage.Shell name="donate" title="Select a Donation Plan" big="false">
        {loading
          ? <Loading />
          : <TandemForms tandemForms={tandemForms} />
        }
        </ContentPage.Shell>
      );
  }
}

module.exports = DonatePage;