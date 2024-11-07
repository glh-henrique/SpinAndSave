import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppTheme from "../theme/appTheme";
import { CssBaseline, Typography, Box, FormControl, FormLabel, TextField, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useMessage } from "../context/MessageContext";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Container, MuiCard } from "../shared/styles";


const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const { showMessage } = useMessage();
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
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
        <Container direction="column" justifyContent="space-between">
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  color={errors.password ? 'error' : 'primary'}
                  slotProps={{
                    input: {
                      endAdornment:
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    }
                  }}
                />
              </FormControl>
              <Button type="submit" fullWidth variant="contained" disabled={loading}>Sign in</Button>
              <Typography textAlign={'center'}>
                Don&apos;t have an account? <Link to='/register'>Sign up</Link>
              </Typography>
            </Box>
          </MuiCard>
        </Container>
      </AppTheme>
    </>
  );
};

export default Login;
