import React from 'react';
import { PageContext } from './ContextMixins';

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

  get page() {
    return this.props.pageName;
  }

  render() {

    const {
      page:{
        post_title: title,
        post_content: content
      }
    } = this.state;

    const { children } = this.props;

    return (
      <ContentPageShell name={this.page} title={title}>
        <div className="content" dangerouslySetInnerHTML={{__html:content}} />
        {children}
      </ContentPageShell>
      );
  }
}

ContentPage.Shell = ContentPageShell;

module.exports = ContentPage;
