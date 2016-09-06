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
            <p className="login-or-register hidden-xs hidden-sm">
              <span className="glyphicon glyphicon-arrow-left" /> OR <span className="glyphicon glyphicon-arrow-right" />
            </p>
            <p className="login-or-register text-center hidden-md hidden-lg hidden-md hidden-xl">
              <span className="glyphicon glyphicon-arrow-up" /><br />
               OR <br />
               <span className="glyphicon glyphicon-arrow-down" />
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