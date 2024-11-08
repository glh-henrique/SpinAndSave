import React from "react";

import { Card, CssBaseline, Stack, styled, Typography } from "@mui/material";
import AppTheme from "../theme/appTheme";


const MuiCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  backgroundColor: 'transparent !important',
  backgroundImage:'none',
  boxShadow: 'none'
}));

const LoadingContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(4) },
}));

const Loading: React.FC = () => (
  <>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <LoadingContainer direction="column" justifyContent="space-between">
          <MuiCard>
            <img src="loading-cat-trans.gif" alt="loading" style={{ maxWidth: '350px'}} />
            <Typography textAlign={'center'}>Loading...</Typography>
          </MuiCard>
        </LoadingContainer>
      </AppTheme>
    </>
)

export default Loading;
