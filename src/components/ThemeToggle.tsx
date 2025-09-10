"use client";

import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  Typography,
} from '@mui/material';
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  SettingsBrightness as SystemIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'button' | 'menu';
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  size = 'small',
  showLabels = true,
  className = '',
}) => {
  const { mode, isDark, toggleTheme, setTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
    setTheme(newMode);
    handleMenuClose();
  };

  const getThemeIcon = () => {
    switch (mode) {
      case 'light':
        return <LightModeIcon />;
      case 'dark':
        return <DarkModeIcon />;
      case 'system':
        return <SystemIcon />;
      default:
        return isDark ? <DarkModeIcon /> : <LightModeIcon />;
    }
  };

  const getThemeLabel = () => {
    switch (mode) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      case 'system':
        return 'System';
      default:
        return isDark ? 'Dark Mode' : 'Light Mode';
    }
  };

  const sizeMap = {
    small: { button: 32, icon: 18 },
    medium: { button: 40, icon: 20 },
    large: { button: 48, icon: 24 },
  };

  const currentSize = sizeMap[size];

  if (variant === 'icon') {
    return (
      <Tooltip title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
        <IconButton
          onClick={toggleTheme}
          size={size}
          className={className}
          sx={{
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          {getThemeIcon()}
        </IconButton>
      </Tooltip>
    );
  }

  if (variant === 'button') {
    return (
      <Tooltip title="Theme settings">
        <IconButton
          onClick={handleMenuOpen}
          size={size}
          className={className}
          sx={{
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          {getThemeIcon()}
          {showLabels && (
            <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 0.5 }}>
                {getThemeLabel()}
              </Typography>
              <ExpandMoreIcon sx={{ fontSize: 16 }} />
            </Box>
          )}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip title="Theme settings">
        <IconButton
          onClick={handleMenuOpen}
          size={size}
          className={className}
          sx={{
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          {getThemeIcon()}
          {showLabels && (
            <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 0.5 }}>
                {getThemeLabel()}
              </Typography>
              <ExpandMoreIcon sx={{ fontSize: 16 }} />
            </Box>
          )}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <MenuItem
          onClick={() => handleThemeChange('light')}
          selected={mode === 'light'}
         
        >
          <ListItemIcon>
            <LightModeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Light Mode"
            secondary="Use light theme"
          />
        </MenuItem>

        <MenuItem
          onClick={() => handleThemeChange('dark')}
          selected={mode === 'dark'}
          sx={{
            '&.Mui-selected': {
              backgroundColor: 'gray.800',
              color: 'white',
              '&:hover': {
                backgroundColor: 'gray.700',
              },
            },
          }}
        >
          <ListItemIcon>
            <DarkModeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dark Mode"
            secondary="Use dark theme"
          />
        </MenuItem>

        <MenuItem
          onClick={() => handleThemeChange('system')}
          selected={mode === 'system'}
          sx={{
            '&.Mui-selected': {
              backgroundColor: 'gray.800',
              color: 'white',
              '&:hover': {
                backgroundColor: 'gray.700',
              },
            },
          }}
        >
          <ListItemIcon>
            <SystemIcon />
          </ListItemIcon>
          <ListItemText
            primary="System"
            secondary="Follow system preference"
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ThemeToggle; 