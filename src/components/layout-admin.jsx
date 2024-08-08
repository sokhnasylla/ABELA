// components/Layout/Layout.js
import React from 'react';
import Footer from './Footer/Footer';
import { Navigate } from 'react-router-dom';
import { getTokenDecode } from './Pages/Auth/authUtils';
import { RoleConstants } from '../config/role.constants';

const LayoutAdmin = ({ children }) => {

  const roleAdmin = [
    RoleConstants.admin.code,
  ];

  const userToken = getTokenDecode();

  console.log("-----------ACCESS-------- ", roleAdmin, " --------- ", userToken.roles, userToken.roles.some(role => roleAdmin.includes(role)));

  if (userToken.roles.some(role => roleAdmin.includes(role))) {
    return (
      <div>
        <div className="content">
          {children}
        </div>
        <Footer />
      </div>
    );
  }
  return <Navigate to="/signin" />;
};

export default LayoutAdmin;
