import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { colorSchemes, shadows, shape, typography } from './themePrimitives';

interface AppThemeProps {
  children: React.ReactNode;
}

export default function AppTheme({children}: AppThemeProps) {
  const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-mui-color-scheme',
      cssVarPrefix: 'template',
    },
    colorSchemes,
    typography,
    shadows,
    shape
  });

  return (
    <ThemeProvider theme={theme} >
      {children}
    </ThemeProvider>
  );
}
