import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// USER PAGES
import Profile from './Profile';
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const UserPages = ({ match }) => (
  <Fragment>
    <div className="app-container">
      {/* User Pages */}

      <Route path={`${match.url}/profile`} exact>
        <AppHeader menuclosable={false} />
        <div className="app-main">
          <AppSidebar innermenu={true} />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <Profile />
            </div>
          </div>
        </div>
      </Route>
    </div>
  </Fragment>
);

export default UserPages;
