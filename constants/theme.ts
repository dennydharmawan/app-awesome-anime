import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// https://material-ui.com/customization/palette/
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    darkBlue: React.CSSProperties['color'];
    spaceCadet: React.CSSProperties['color'];
    purpleNavy: React.CSSProperties['color'];
    cornflowerBlue: React.CSSProperties['color'];
    softWhite: React.CSSProperties['color'];
  }
  interface PaletteOptions {
    darkBlue: React.CSSProperties['color'];
    spaceCadet: React.CSSProperties['color'];
    purpleNavy: React.CSSProperties['color'];
    cornflowerBlue: React.CSSProperties['color'];
    softWhite: React.CSSProperties['color'];
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent: PaletteOptions['primary'];
  }
}

declare module '@material-ui/core/Typography/Typography' {
  interface TypographyPropsVariantOverrides {
    bold: true;
    medium: true;
    light: true;
  }
}

let theme = createMuiTheme({
  typography: {
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
    fontWeightRegular: 500,
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: '#6458EE',
      contrastText: '#fff',
    },
    secondary: {
      main: '#10163a',
      contrastText: '#fff',
    },
    accent: {
      main: '#3476FC',
      contrastText: '#fff',
    },
    darkBlue: '#0A1625',
    spaceCadet: '#31395E',
    purpleNavy: '#54548C',
    cornflowerBlue: '#7899D4',
    softWhite: '#E5EBF1',
    type: 'light',
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'bold' },
          style: {
            color: 'hsl(0, 0%, 13%)',
            fontWeight: 700,
            fontSize: '1.6rem',
          },
        },
        {
          props: { variant: 'medium' },
          style: {
            color: 'hsl(0, 0%, 29%)',
            fontWeight: 500,
            fontSize: '1.4rem',
          },
        },
        {
          props: { variant: 'light' },
          style: {
            color: 'hsl(0, 0%, 54%)',
            fontWeight: 500,
            fontSize: '1.4rem',
          },
        },
      ],
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
