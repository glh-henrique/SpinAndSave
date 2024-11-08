import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Box, FormControl, FormLabel, TextField, Button, CssBaseline } from "@mui/material";
import { account } from "../appwrite";
import { useMessage } from "../context/MessageContext";
import { validationResetPassSchema } from "../utils/formValidatorsSchema";
import AppTheme from "../theme/appTheme";
import { Container, MuiCard } from "../shared/styles";


const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showMessage } = useMessage();
  const initialValue = { password: "", confirmPassword: "" };

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId") || "";
  const secret = queryParams.get("secret") || "";


  const handleResetPassword = async (values: { password: string; confirmPassword: string }) => {
    try {
      await account.updateRecovery(userId, secret, values.confirmPassword);
      showMessage("Password reset successful! You can now log in with your new password.", "success");
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      showMessage("Failed to reset password. Please try again or check the link.", "error");
    }
  };

  return (
    <>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <Container direction="column" justifyContent="space-between">
          <MuiCard variant="outlined">
            <Typography component="h2" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
              Reset Password
            </Typography>
            <Formik
              initialValues={initialValue}
              validationSchema={validationResetPassSchema}
              onSubmit={handleResetPassword}
            >
              {({ errors, touched }) => (
                <Form>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControl>
                      <FormLabel htmlFor="password">New Password</FormLabel>
                      <Field
                        as={TextField}
                        name="password"
                        id="password"
                        type="password"
                        placeholder="••••••"
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                        helperText={<ErrorMessage name="password" />}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
                      <Field
                        as={TextField}
                        name="confirmPassword"
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••"
                        fullWidth
                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        helperText={<ErrorMessage name="confirmPassword" />}
                        variant="outlined"
                      />
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained">
                      Reset Password
                    </Button>
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

export default ResetPassword;
