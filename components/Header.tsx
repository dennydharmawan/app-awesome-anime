import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AcUnitRounded } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";

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
    marginRight: 'auto',
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
            <Button
              variant="contained"
              component={Link as React.ElementType}
              href="/search"
              startIcon={<SearchIcon />}
              disableElevation
            >
              Search
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default Header;
