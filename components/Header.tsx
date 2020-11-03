import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AcUnitRounded } from "@material-ui/icons";

import theme from "../constants/theme";
import Link from "./Link";

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  mainLink: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
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
            <Link className={classes.mainLink} href="/">
              <AcUnitRounded />
              <Typography variant="h4" component="h1">
                Awesome Anime
              </Typography>
              <AcUnitRounded />
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default Header;
