import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, requiredRole }) => {
  const token = localStorage.getItem('token');
  const isStaff = localStorage.getItem('isStaff') === 'true';

  if (!token) {
    return <Navigate to="/" />;
  }

  if (requiredRole === 'staff' && !isStaff) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
