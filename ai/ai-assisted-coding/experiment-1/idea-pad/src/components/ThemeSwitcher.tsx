
'use client';

import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface ThemeSwitcherProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeSwitcher;
