import { Grid, makeStyles } from "@material-ui/core";

import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return ( 
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <header>
          <Header />
        </header>
      </Grid>
      <Grid item xs={12}>
        <main>{children}</main>
      </Grid>
    </Grid>
  );
};

export default Layout;
