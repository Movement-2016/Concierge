import React from 'react';

const ActionForm = () => {
  <form className="action-form" />;
};

const ActionPage = props => {
  return (
    <main className="action-page">
      <div className="container">
        <h1 className="page-title">{'Puerto Rico Voter Project'}</h1>
        <ActionForm />
      </div>
    </main>
  );
};

module.exports = ActionPage;
