import { ThemeProvider, createTheme } from '@mui/material/styles';
import { colorSchemes, shadows, shape, typography } from './themePrimitives';
import {  IAppThemeProps } from '../utils/interfaces';

export default function AppTheme({children}: IAppThemeProps) {
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
