import { createTheme } from '@mui/material/styles';

// Light theme colors
const lightColors = {
  primary: {
    main: '#1F4D6A',
    light: '#2E6B8A',
    dark: '#153A4F',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FF6B35',
    light: '#FF8A5C',
    dark: '#E55A2B',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#f5f9fd',
    paper: '#F8F9FA',
    card: '#FFFFFF',
    surface: '#F8F9FA',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    disabled: '#999999',
  },
  divider: '#E0E0E0',
  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
  },
  warning: {
    main: '#ED6C02',
    light: '#FF9800',
    dark: '#E65100',
  },
  info: {
    main: '#0288D1',
    light: '#03DAC6',
    dark: '#01579B',
  },
  success: {
    main: '#2E7D32',
    light: '#4CAF50',
    dark: '#1B5E20',
  },
};

// Dark theme colors
const darkColors = {
  primary: {
    main: '#64B5F6',
    light: '#90CAF9',
    dark: '#1976D2',
    contrastText: '#000000',
  },
  secondary: {
    main: '#FF8A65',
    light: '#FFAB91',
    dark: '#E64A19',
    contrastText: '#000000',
  },
  background: {
    default: '#111827',
    paper: '#1f2937',
    card: '#2D2D2D',
    surface: '#1f2937',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    disabled: '#666666',
  },
  divider: '#333333',
  error: {
    main: '#F44336',
    light: '#E57373',
    dark: '#D32F2F',
  },
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#F57C00',
  },
  info: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
  },
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
  },
};

// Create light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...lightColors,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: lightColors.background.default,
          color: lightColors.text.primary,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: lightColors.background.card,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: lightColors.background.paper,
        },
      },
    },
  },
});

// Create dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...darkColors,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: darkColors.background.default,
          color: darkColors.text.primary,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: darkColors.background.card,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: darkColors.background.paper,
        },
      },
    },
  },
});

// Default theme (light)
export const theme = lightTheme; 