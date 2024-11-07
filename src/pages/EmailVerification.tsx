import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { account } from "../appwrite";
import { CssBaseline, Typography } from "@mui/material";
import AppTheme from "../theme/appTheme";
import { Container, MuiCard } from "../shared/styles";


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
        <Container direction="column" justifyContent="space-between">
          <MuiCard variant="outlined">
            <Typography component="h2" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
              Verificação de e-mail
            </Typography>

            <Typography component="p" sx={{ marginBottom: '24px' }}>
              {message}
            </Typography>

            <Link to='/'>Voltar para Inicio</Link>
          </MuiCard>
        </Container>
      </AppTheme>
    </>
  );
};

export default Verification;
