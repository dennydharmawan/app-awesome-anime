import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AcUnitRounded } from "@material-ui/icons";

import theme from "../constants/theme";

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  offset: theme.mixins.toolbar,
});

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.root}>
        <Container maxWidth="lg">
          <Toolbar>
            <AcUnitRounded />
            <Typography variant="h4" component="h1">
              Awesome Anime
            </Typography>
            <AcUnitRounded />
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default Header;
