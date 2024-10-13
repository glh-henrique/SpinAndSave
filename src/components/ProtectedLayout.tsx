import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const ProtectedLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default ProtectedLayout;
