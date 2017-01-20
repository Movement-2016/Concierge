import React from 'react';
import { PageContext } from './ContextMixins';
import Loading from './Loading.jsx';

class ContentPageShell extends React.Component {
  render() {
    const { 
      name, 
      title, 
      children,
      big 
    } = this.props;

    const cls = 'container ' + (big ? '' : 'small-container');

    return(
        <main className={`content-page ${name}`}>
          <div className={cls}>
            <h1 className="page-title">{title}</h1>
            {children}
          </div>
        </main>
      );
  }
}

class ContentPage extends PageContext(React.Component) {

  constructor() {
    super(...arguments);
    this.state = {};
  }

  get page() {
    return this.props.page;
  }

  render() {

    if( !this.state.page ) {
      return <Loading />;      
    }

    const { 
      page:{
        fields:{
          html: content
        },
        post_title: title
      }
    } = this.state;

    return (
      <ContentPageShell name={this.page} title={title}>
        <div className="content" dangerouslySetInnerHTML={{__html:content}} />
      </ContentPageShell>
      );
  }
}

ContentPage.Shell = ContentPageShell;

module.exports = ContentPage;