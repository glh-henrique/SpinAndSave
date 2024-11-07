import React, { useState } from "react";
import { account, databases } from "../appwrite";
import { ID } from "appwrite";
import AppTheme from "../theme/appTheme";
import { CssBaseline, Typography, Box, FormControl, FormLabel, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useMessage } from "../context/MessageContext";
import { Container, MuiCard } from "../shared/styles";

const Register: React.FC = () => {
  const {showMessage} = useMessage()
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    aptoNumber: ""
  });

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const name = data.get('name') as string;
    const aptoNumber = data.get('aptoNumber') as string;

    try {
      const userID = ID.unique();
      await account.create(userID, email, password, name);
      await account.createEmailPasswordSession(email, password);

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USER_PROFILES_COLLECTION_ID,
        ID.unique(),
        {
          userId: userID,
          aptoNumber: aptoNumber,
        }
      );

      const redirectURL = "https://spin-and-save.vercel.app/email-verification";
      await account.createVerification(redirectURL);
      await account.deleteSession("current");

      showMessage('Registro bem-sucedido! Por favor, verifique seu e-mail para ativar sua conta.', 'success');

    } catch (error) {
      console.error("Erro no registro:", error);
      showMessage('Registro falhou.! Por favor, tente novamente.', 'error');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));

    if (id === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Por favor, use um email válido!" }));
    }

    if (id === "password" && value.length > 0 && value.length < 6) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password precisa ter ao menos 6 caracteres." }));
    }

    if (id === "name" && !/^[a-zA-Z\s]{5,50}$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Nome é obrigatório" }));
    }

    if (id === "aptoNumber" && value.length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, aptoNumber: "Nº apartamento é obrigatório" }));
    }
  };

  const validateInputs = () => {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const aptoNumber = (document.getElementById('aptoNumber') as HTMLInputElement).value;

    let isValid = true;
    const newErrors = { email: "", password: "", name: "", aptoNumber: "" };

    if (!email) {
      newErrors.email = "Email é obrigatório.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Por favor, use um email válido!";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password é obrigatório.";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password precisa ter ao menos 6 caracteres.";
      isValid = false;
    }

    if (!name) {
      newErrors.name = "Nome é obrigatório.";
      isValid = false;
    }

    if (!aptoNumber) {
      newErrors.aptoNumber = " Nº do apto é obrigatório.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <Container direction="column" justifyContent="space-between">
          <MuiCard variant="outlined">
            <Typography component="h1" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
              Cadastre-se
            </Typography>
            <Box component="form" onSubmit={handleRegister} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  onChange={handleChange}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                  fullWidth
                  variant="outlined"
                  color={errors.email ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  onChange={handleChange}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  color={errors.password ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <TextField
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  onChange={handleChange}
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name here"
                  autoComplete="Name"
                  required
                  fullWidth
                  variant="outlined"
                  color={errors.name ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="aptoNumber">Numero do Apartamento</FormLabel>
                <TextField
                  error={Boolean(errors.aptoNumber)}
                  helperText={errors.aptoNumber}
                  onChange={handleChange}
                  id="aptoNumber"
                  type="text"
                  name="aptoNumber"
                  placeholder="Your apto number here"
                  autoComplete="number"
                  required
                  fullWidth
                  variant="outlined"
                  color={errors.aptoNumber ? 'error' : 'primary'}
                />
              </FormControl>
              <Button type="submit" fullWidth variant="contained">Sign in</Button>
              <Typography sx={{ textAlign: 'center' }}>
                Ja possiu conta? <Link to='/'>Faça o login</Link>
              </Typography>
            </Box>
          </MuiCard>
        </Container>
      </AppTheme>
    </>
  );
};

export default Register;
