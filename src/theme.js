// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // You can adjust the color to match your brand's colors
    },
    secondary: {
      main: '#f50057', // Secondary color (e.g., for buttons)
    },
    background: {
      default: '#f4f6f8', // Set the background color for the whole app
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  shape: {
    borderRadius: 8, // Round corners globally
  },
});

export default theme;