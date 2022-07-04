import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import Reviews from './Components/reviews';

const AppReviews = ({ match }) => {
  return <Reviews />;
};

export default AppReviews;
