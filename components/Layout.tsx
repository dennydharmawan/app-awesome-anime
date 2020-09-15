import { Container, Grid, makeStyles } from "@material-ui/core";

import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  grid: {
    backgroundColor: '#E5EBF1',
    minHeight: 'calc(100vh - 64px)',
  },
  mainContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12} classes={{ root: classes.grid }}>
        <Container maxWidth="lg" className={classes.mainContainer}>
          <>{children}</>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Layout;
