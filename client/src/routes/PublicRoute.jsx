import React from 'react';
import PropTypes from 'react-proptypes';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    window.sessionStorage.getItem('token')
      ? <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
      : <Component {...props} />
  )} />
);

PublicRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
};

export default PublicRoute;
