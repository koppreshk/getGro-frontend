import { createTheme } from "@mui/material";

export const defaultMUITheme = createTheme(
  {
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