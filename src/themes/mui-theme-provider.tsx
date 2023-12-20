import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    body3: React.CSSProperties;
  }

  // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}

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

      // Custom sizes for header fonts
      h1: {
        fontSize: 40,
        fontWeight: 500
      },
      h2: {
        fontSize: 28,
        fontWeight: 500
      },
      h3: {
        fontSize: 24,
        fontWeight: 500
      },
      h4: {
        fontSize: 20,
        fontWeight: 500
      },
      h5: {
        fontSize: 16,
        fontWeight: 500
      },
      h6: {
        fontSize: 14,
        fontWeight: 500
      },
      body3: {
        fontSize: 13,
      }
    }
  }
)