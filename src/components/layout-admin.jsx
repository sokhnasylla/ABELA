// components/Layout/Layout.js
import React from 'react';
import Header from './Header/Header';
import Menu from './Menu/Menu';
import Footer from './Footer/Footer';
import { Navigate } from 'react-router-dom';
import { getTokenFromLocalStorage } from './Pages/Auth/authUtils';

const LayoutAdmin = ({ children }) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LayoutAdmin;