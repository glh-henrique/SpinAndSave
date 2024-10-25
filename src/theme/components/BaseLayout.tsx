import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { ToastContainer } from 'react-toastify';
import { Analytics } from "@vercel/analytics/react"
import AppTheme from '../appTheme';

const BaseLayout: React.FC = () => {
  return (
    <AppTheme>
      <NavBar />
      <div className="main-content flex-grow p-4">
        <Outlet />
        <Analytics />
        <ToastContainer />
      </div>
    </AppTheme>
  );
};

export default BaseLayout;
