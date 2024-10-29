import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { account } from "../appwrite";
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

const Verification: React.FC = () => {
  const location = useLocation();
  const [message, setMessage] = useState<string>("Verific")


  useEffect(() => {
    const verifyUser = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const userId = params.get("userId");
        const secret = params.get("secret");

        if (userId && secret) {
          await account.updateVerification(userId, secret);
          setMessage("E-mail verificado com sucesso! Você já pode fazer login.");
        } else {
          setMessage("Link de verificação inválido.");
        }
      } catch (error) {
        console.error("Erro na verificação de e-mail:", error);
        setMessage("A verificação falhou. Por favor, tente novamente.");
      }
    };

    verifyUser();
  }, [location]);

  return (
    <>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <MuiCard variant="outlined">
            <Typography component="h2" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
              Verificação de e-mail
            </Typography>

            <Typography component="p" sx={{ marginBottom: '24px' }}>
              {message}
            </Typography>

            <Link to='/'>Voltar para Inicio</Link>
          </MuiCard>
        </SignInContainer>
      </AppTheme>
    </>
  );
};

export default Verification;
