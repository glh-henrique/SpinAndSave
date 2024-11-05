import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppTheme from "../theme/appTheme";
import { CssBaseline, Card, Typography, Box, FormControl, FormLabel, TextField, Button, styled, Stack } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useMessage } from "../context/MessageContext";

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

const Login: React.FC = () => {
  const { login, loading} = useAuth();
  const { showMessage } = useMessage();
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    try {
      await login(email, password);
    } catch (error) {
      console.error("Erro no login:", error);
      showMessage("Login falhou. Verifique suas credenciais.", "error");
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
  };

  const validateInputs = () => {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    let isValid = true;
    const newErrors = { email: "", password: "" };

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

    setErrors(newErrors);
    return isValid;
  };

  return (
    <>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <MuiCard variant="outlined">
            <Typography component="h1" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleLogin} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              <Button type="submit" fullWidth variant="contained" disabled={loading}>Sign in</Button>
              <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account? <Link to='/register'>Sign up</Link>
              </Typography>
            </Box>
          </MuiCard>
        </SignInContainer>
      </AppTheme>
    </>
  );
};

export default Login;
