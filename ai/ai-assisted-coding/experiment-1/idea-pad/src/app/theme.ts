import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
    },
  });

export default getTheme;