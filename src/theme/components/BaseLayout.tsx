import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { Analytics } from "@vercel/analytics/react"
import AppTheme from '../appTheme';
import styled from '@emotion/styled';

const CustomDiv = styled('div')({
  paddingTop: '68px',
  paddingLeft: '24px',
  paddingRight: '24px',
  width: '100%',
  maxWidth: '1024px',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto'
});

const BaseLayout: React.FC = () => {
  return (
    <AppTheme>
      <NavBar />
      <CustomDiv>
        <Outlet />
        <Analytics />
      </CustomDiv>
    </AppTheme>
  );
};

export default BaseLayout;
