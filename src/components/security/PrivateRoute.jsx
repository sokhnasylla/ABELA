// PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? <Component {...props} /> : <Navigate to="/login" />
    }
  />
);

export default PrivateRoute;
