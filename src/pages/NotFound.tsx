import React from "react";
import { Card, CssBaseline, Stack, styled, Typography } from "@mui/material";
import AppTheme from "../theme/appTheme";
import { Link } from "react-router-dom";

const MuiCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: { maxWidth: '450px' },
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(4) },
}));

const NotFound: React.FC = () => {
  return (
    <>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <MuiCard variant="outlined">
            <Typography component="h2" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
              404
            </Typography>

            <Typography component="p" sx={{ marginBottom: '24px' }}>
              Página não encontrada
            </Typography>

            <Link to='/'>Voltar para Inicio</Link>
          </MuiCard>
        </SignInContainer>
      </AppTheme>
    </>
  );
};

export default NotFound;
