'use client';

import React, { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, PaletteMode } from '@mui/material';
import getTheme from './theme';
import { ThemeContext } from '../context/ThemeContext';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);
  const isDarkMode = useMemo(() => mode === 'dark', [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}