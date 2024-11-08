import React, { useState } from "react";
import { account, databases } from "../appwrite";
import { ID } from "appwrite";
import AppTheme from "../theme/appTheme";
import { CssBaseline, Typography, Box, FormControl, FormLabel, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import { useMessage } from "../context/MessageContext";
import { Container, MuiCard } from "../shared/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationRegistrationSchema } from "../utils/formValidatorsSchema";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register: React.FC = () => {
  const { showMessage } = useMessage();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfimation, setShowPasswordConfimation] = useState(false);
  const initialValue = { email: "", password: "", confirmPassword: "", name: "", aptoNumber: "" }


  const handleRegister = async (values: { email: string; password: string; name: string; aptoNumber: string }) => {
    try {
      const userID = ID.unique();
      await account.create(userID, values.email, values.password, values.name);
      await account.createEmailPasswordSession(values.email, values.password);

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USER_PROFILES_COLLECTION_ID,
        ID.unique(),
        {
          userId: userID,
          aptoNumber: values.aptoNumber,
        }
      );

      const redirectURL = "https://spin-and-save.vercel.app/email-verification";
      await account.createVerification(redirectURL);
      await account.deleteSession("current");

      showMessage("Registro bem-sucedido! Por favor, verifique seu e-mail para ativar sua conta.", "success");
    } catch (error) {
      console.error("Erro no registro:", error);
      showMessage("Registro falhou. Por favor, tente novamente.", "error");
    }
  };

  const handleTogglePassword = (type: string) => {
    type === 'password' && setShowPassword((prev) => !prev);
    type === 'confirmPassword' && setShowPasswordConfimation((prev) => !prev);
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Container direction="column" justifyContent="space-between">
        <MuiCard variant="outlined">
          <Typography component="h1" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            Cadastre-se
          </Typography>
          <Formik
            initialValues={initialValue}
            validationSchema={validationRegistrationSchema}
            onSubmit={handleRegister}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleTogglePassword('password')}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="confirmPassword">Confirme o Password</FormLabel>
                    <Field
                      as={TextField}
                      name="confirmPassword"
                      id="confirmPassword"
                      type={showPasswordConfimation ? "text" : "password"}
                      placeholder="••••••"
                      fullWidth
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      helperText={<ErrorMessage name="confirmPassword" />}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleTogglePassword('confirmPassword')}
                              edge="end"
                            >
                              {showPasswordConfimation ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Field
                      as={TextField}
                      name="name"
                      id="name"
                      type="text"
                      placeholder="Your name here"
                      fullWidth
                      error={Boolean(touched.name && errors.name)}
                      helperText={<ErrorMessage name="name" />}
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="aptoNumber">Numero do Apartamento</FormLabel>
                    <Field
                      as={TextField}
                      name="aptoNumber"
                      id="aptoNumber"
                      type="text"
                      placeholder="Your apto number here"
                      fullWidth
                      error={Boolean(touched.aptoNumber && errors.aptoNumber)}
                      helperText={<ErrorMessage name="aptoNumber" />}
                      variant="outlined"
                    />
                  </FormControl>
                  <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
                    Sign in
                  </Button>
                  <Typography align="center">
                    Ja possiu conta? <Link to='/'>Faça o login</Link>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </MuiCard>
      </Container>
    </AppTheme>
  );
};

export default Register;
