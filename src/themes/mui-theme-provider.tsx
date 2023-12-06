import { createTheme } from "@mui/material";

export const defaultMUITheme = createTheme(
  {
    palette: {
      primary: {
        main: '#6969ff',
      },
    },
    typography: {
      allVariants: {
        color: '#3b4455',
      },
      fontFamily: [
        'Poppins',
      ].join(','),
    },
  }
)