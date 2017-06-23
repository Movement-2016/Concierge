import React from 'react';

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

class ContentPage extends React.Component {

  render() {

    const {
      model: {
        page:{
          post_title: title,
          post_content: content
        }       
      },
      children
    } = this.props;

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
