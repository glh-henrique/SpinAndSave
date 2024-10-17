import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { ToastContainer } from 'react-toastify';

const BaseLayout: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="main-content flex-grow p-4">
          <Outlet />
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
