import React from 'react';
import { connect } from 'react-redux';

const ContentPageShell = ({ name = '', title, children, big }) => (
  <main className={`content-page ${name}`}>
    <div className={'container ' + (big ? '' : 'small-container')}>
      <h1 className="page-title">{title}</h1>
      {children}
    </div>
  </main>
);

/* eslint-disable react/no-danger */

const _ContentPage = ({ pageName = '', title, content, children }) => (
  <ContentPageShell title={title} name={pageName}>
    <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    {children}
  </ContentPageShell>
);

const mapStateToProps = ({
  router: {
    target: {
      model: {
        page: { title, body: content },
      },
    },
  },
}) => ({ title, content });

const ContentPage = connect(mapStateToProps)(_ContentPage);

ContentPage.Shell = ContentPageShell;

module.exports = ContentPage;
