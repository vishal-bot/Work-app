/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthService from 'src/services/authService';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = AuthService.isAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Element {...props} />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default PrivateRoute;
