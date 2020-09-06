import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// https://material-ui.com/customization/palette/
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    utils: Palette['primary'];
  }
  interface PaletteOptions {
    utils: {
      spaceCadet: React.CSSProperties['color'];
      purpleNavy: React.CSSProperties['color'];
      cornflowerBlue: React.CSSProperties['color'];
    };
  }
}

let theme = createMuiTheme({
  typography: {
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
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
    utils: {
      spaceCadet: '#31395E',
      purpleNavy: '#54548C',
      cornflowerBlue: '#7899D4',
    },
    type: 'light',
  },
});

theme = responsiveFontSizes(theme);

export default theme;
