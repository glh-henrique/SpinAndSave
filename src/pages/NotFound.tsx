import React from "react";
import { CssBaseline, Typography } from "@mui/material";
import AppTheme from "../theme/appTheme";
import { Link } from "react-router-dom";
import { Container, MuiCard } from "../shared/styles";

const NotFound: React.FC = () => {
  return (
    <>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <Container direction="column" justifyContent="space-between">
          <MuiCard variant="outlined">
            <Typography component="h2" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
              404
            </Typography>

            <Typography component="p" sx={{ marginBottom: '24px' }}>
              Página não encontrada
            </Typography>

            <Link to='/'>Voltar para Inicio</Link>
          </MuiCard>
        </Container>
      </AppTheme>
    </>
  );
};

export default NotFound;
