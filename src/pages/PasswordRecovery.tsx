import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Typography, Box, FormControl, FormLabel, TextField, Button, CssBaseline } from "@mui/material";
import { useMessage } from "../context/MessageContext";
import { account } from "../appwrite"; // Import Appwrite instance
import AppTheme from "../theme/appTheme";
import { validationRecoverPassSchema } from "../utils/formValidatorsSchema";
import { Container, MuiCard } from "../shared/styles";

const PasswordRecovery: React.FC = () => {
  const { showMessage } = useMessage();
  const initialValue = { email: "" }

  const handleRecovery = async (values: { email: string }) => {
    try {
      await account.createRecovery(values.email, window.location.origin + "/reset-password");
      showMessage("Password reset link sent. Check your email.", "success");
    } catch (error) {
      console.error("Error in password recovery:", error);
      showMessage("Failed to send recovery email. Please try again.", "error");
    }
  };

  return (
    <>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <Container direction="column" justifyContent="space-between">
          <MuiCard variant="outlined">
            <Typography component="h2" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
              Recuperação de Senha
            </Typography>
            <Formik
              initialValues={initialValue}
              validationSchema={validationRecoverPassSchema}
              onSubmit={handleRecovery}
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
                      />
                    </FormControl>
                    <Button type="submit" variant="contained">
                      Envie a recuperação de senha
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                      Lembrou da senha? <Link to="/login">Sign in</Link>
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

export default PasswordRecovery;
