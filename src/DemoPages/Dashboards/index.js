import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// DASHBOARDS

import AnalyticsDashboard from './Analytics/';
import SalesDashboard from './Sales/';
import CommerceDashboard from './Commerce/';
import CRMDashboard from './CRM/';
import MinimalDashboard1 from './Minimal/Variation1';
import MinimalDashboard2 from './Minimal/Variation2';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

import AppReviews from '../../DemoPages/Reviews/index';

// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';

const Dashboards = ({ match }) => {
  return (
    <>
      <ThemeOptions />
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <Route path={`${match.url}/reviews`} exact component={AppReviews} />
            {/* <Route exact path='/' component={AnalyticsDashboard} />
                        <Route exact path='/ratings' component={SalesDashboard} />
                        <Route exact path='/sentiments' component={CommerceDashboard} />
                        <Route exact path='/dashboards' component={CRMDashboard} />
                        <Route exact path='/compare' component={CRMDashboard} /> */}
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  );
};

export default Dashboards;
