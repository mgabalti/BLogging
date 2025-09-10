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
} from '@mui/material';
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  SettingsBrightness as SystemIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeDropdownProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const ThemeDropdown: React.FC<ThemeDropdownProps> = ({
  size = 'medium',
  className = '',
}) => {
  const { mode, isDark, setTheme } = useTheme();
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
        return <DarkModeIcon className="text-white" />;
      case 'system':
        return <SystemIcon />;
      default:
        return isDark ? <DarkModeIcon /> : <LightModeIcon />;
    }
  };

  const sizeMap = {
    small: { button: 32, icon: 18 },
    medium: { button: 40, icon: 20 },
    large: { button: 48, icon: 24 },
  };

  const currentSize = sizeMap[size];

 

  return (
    <>
      <Tooltip title="Theme settings">
        <IconButton
          onClick={handleMenuOpen}
          size={size}
          className={className}
          
        >
          {getThemeIcon()}
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
          />
        </MenuItem>

        <MenuItem
          onClick={() => handleThemeChange('dark')}
          selected={mode === 'dark'}
         
        >
          <ListItemIcon>
            <DarkModeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dark Mode"
          />
        </MenuItem>

        <MenuItem
          onClick={() => handleThemeChange('system')}
          selected={mode === 'system'}
        
        >
          <ListItemIcon>
            <SystemIcon />
          </ListItemIcon>
          <ListItemText
            primary="System"
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ThemeDropdown; 