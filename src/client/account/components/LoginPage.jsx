import React from 'react';

import Login from './Login.jsx';
import Register from './Register.jsx';

const LoginPage = () => {
  return (
      <div className="container loginRegisterArea">
        <div className="row">
          <div className="col-md-4 col-md-offset-1">
            <Login />
          </div>
          <div className="col-md-1">
            <p className="login-or-register">
              <span className="glyphicon glyphicon-arrow-left" /> OR <span className="glyphicon glyphicon-arrow-right" />
            </p>
          </div>
          <div className="col-md-4">
            <Register />
          </div>
      </div>
    </div>
  );
};

module.exports = LoginPage;