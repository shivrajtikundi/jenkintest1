import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// USER PAGES
import LoginBoxed from './LoginBoxed/';
import RegisterBoxed from './RegisterBoxed/';
import ForgotPasswordBoxed from './ForgotPasswordBoxed/';

const AuthPages = ({ match }) => (
  <Fragment>
    <div className="app-container">
      {/* User Pages */}
      <Route path={`${match.url}/login`} component={LoginBoxed} />
      <Route path={`${match.url}/signup`} component={RegisterBoxed} />
      <Route path={`${match.url}/forgot-password`} component={ForgotPasswordBoxed} />
    </div>
  </Fragment>
);

export default AuthPages;
