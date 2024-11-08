import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Link } from "react-router-dom";
import AppTheme from "../theme/appTheme";
import { CssBaseline, Typography, Box, FormControl, FormLabel, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useMessage } from "../context/MessageContext";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Container, MuiCard } from "../shared/styles";
import { validationLoginSchema } from "../utils/formValidatorsSchema";

const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const { showMessage } = useMessage();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = { email: '', password: '' }

  const handleLogin = async (values: { email: string; password: string }) => {
    console.log('handleLogin')
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error("Erro no login:", error);
      showMessage("Login falhou. Verifique suas credenciais.", "error");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
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
            <Formik
              initialValues={initialValues}
              validationSchema={validationLoginSchema}
              onSubmit={handleLogin}
            >
              {({ errors, touched }) => (
                <Form>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Field
                        as={TextField}
                        name="email"
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                        helperText={<ErrorMessage name="email" />}
                        variant="outlined"
                        color={touched.email && errors.email ? 'error' : 'primary'}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field
                        as={TextField}
                        name="password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••"
                        autoComplete="current-password"
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                        helperText={<ErrorMessage name="password" />}
                        variant="outlined"
                        color={touched.password && errors.password ? 'error' : 'primary'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleTogglePassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                    <Typography align="right">
                      <Link to='/password-recovery'>Esqueceu a senha? </Link>
                    </Typography>
                    <Button type="submit" fullWidth variant="contained" disabled={loading}>
                      Sign in
                    </Button>
                    <Typography textAlign='center'>
                      Don&apos;t have an account? <Link to='/register'>Sign up</Link>
                    </Typography>
                  </Box>
                </Form>
              )}
            </Formik>
          </MuiCard>
        </Container>
      </AppTheme>
    </>
  );
};

export default Login;
