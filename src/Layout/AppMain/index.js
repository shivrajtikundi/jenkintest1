import { Redirect, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy, Fragment } from 'react';
import Loader from 'react-loaders';
import { ToastContainer } from 'react-toastify';
import AnalyticsDashboard from '../../DemoPages/Dashboards/Analytics';
import SalesDashboard from '../../DemoPages/Dashboards/Sales';
import CommerceDashboard from '../../DemoPages/Dashboards/Commerce';
import CRMDashboard from '../../DemoPages/Dashboards/CRM';
import Home from '../../DemoPages/Home';
import PrivateRoute from './PrivateRoute';

const UserPages = lazy(() => import('../../DemoPages/UserPages'));
const AuthPages = lazy(() => import('../../DemoPages/AuthPages'));
const Applications = lazy(() => import('../../DemoPages/Applications'));
const Dashboards = lazy(() => import('../../DemoPages/Dashboards'));
const Widgets = lazy(() => import('../../DemoPages/Widgets'));
const Elements = lazy(() => import('../../DemoPages/Elements'));
const Components = lazy(() => import('../../DemoPages/Components'));
const Charts = lazy(() => import('../../DemoPages/Charts'));
const Forms = lazy(() => import('../../DemoPages/Forms'));
const Tables = lazy(() => import('../../DemoPages/Tables'));

const AppMain = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-pulse-rise" />
              </div>
              <h6 className="mt-5">
                Please wait while we load all the Components examples
                <small>
                  Because this is a demonstration we load at once all the Components examples. This wouldn't happen in a
                  real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Switch>
          {/* Analysis Section Routes */}
          {/* <Route path="/analysis" component={Dashboards} /> */}
          <PrivateRoute path="/analysis" component={Dashboards} />

          {/* Grouping Section Routes */}
          {/* <Route path="/grouping" component={Dashboards} /> */}
          <PrivateRoute path="/grouping" component={Dashboards} />

          {/* Audience Section Routes */}
          {/* <Route path="/audience" component={Dashboards} /> */}
          <PrivateRoute path="/audience" component={Dashboards} />

          {/* Reporting Section Routes */}
          {/* <Route path="/reporting" component={Dashboards} /> */}
          <PrivateRoute path="/reporting" component={Dashboards} />

          {/* UserPages Section Routes */}
          {/* <Route path="/users" component={Dashboards} /> */}
          <PrivateRoute path="/users" component={UserPages} />

          {/* Auth Section Routes */}
          <Route path="/auth" component={AuthPages} />

          {/* HomePage Section Routes */}
          <Route exact path="/" component={Home} />

          {/* Redirect user to login page if they input wrong route */}
          <Redirect to="/auth/login" />
        </Switch>
      </Suspense>
    </>
  );
};

export default AppMain;
