import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { ToastContainer } from 'react-toastify';
import { Analytics } from "@vercel/analytics/react"
import AppTheme from '../appTheme';
import styled from '@emotion/styled';

const CustomDiv = styled('div')({
  paddingTop: '68px',
  width: '100%',
  maxWidth: '1600px'
});

const BaseLayout: React.FC = () => {
  return (
    <AppTheme>
      <NavBar />
      <CustomDiv>
        <Outlet />
        <Analytics />
        <ToastContainer />
      </CustomDiv>
    </AppTheme>
  );
};

export default BaseLayout;
