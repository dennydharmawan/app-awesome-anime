import { signin, signout, useSession } from "next-auth/client";
import { useRouter } from "next/router";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AcUnitRounded } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";

import theme from "../constants/theme";
import LoginIcon from "./icons/LoginIcon";
import LogoutIcon from "./icons/LogoutIcon";
import Link from "./Link";
import { PopperMenu, PopperMenuButton, PopperMenuContent } from "./PopperMenu";

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
  const [session] = useSession();

  return (
    <>
      <AppBar className={classes.root}>
        <Container maxWidth="lg">
          <Toolbar>
            <Link className={classes.mainLink} href="/">
              <Typography variant="h4" component="h1">
                Awesome Anime
              </Typography>
            </Link>

            <Box
              sx={{
                display: 'flex',
                columnGap: '1rem',
                flexWrap: 'wrap',
                marginLeft: 'auto',
              }}
            >
              <Button
                variant="contained"
                component={Link as React.ElementType}
                href="/search"
                startIcon={<SearchIcon />}
                disableElevation
              >
                Search
              </Button>

              {!session && (
                <Button
                  variant="contained"
                  href={`/auth/login?callbackUrl=${encodeURIComponent(
                    process.env.NEXT_PUBLIC_SITE as string
                  )}`}
                  startIcon={<LoginIcon />}
                  disableElevation
                >
                  Login
                </Button>
              )}

              {session && (
                <PopperMenu>
                  <PopperMenuButton>
                    <IconButton>
                      <Avatar
                        alt={session.user.name as string}
                        src={session.user.image as string}
                        sx={{
                          width: '2.25rem',
                          height: '2.25rem',
                        }}
                      />
                    </IconButton>
                  </PopperMenuButton>

                  <PopperMenuContent>
                    <Box>
                      <Box
                        sx={{
                          textAlign: 'center',
                          textTransform: 'capitalize',
                          padding: '1em 2em',
                        }}
                      >
                        {session.user.name}
                      </Box>
                      <Divider />
                      <List component="nav" disablePadding>
                        <ListItem button component={Link} href="/home">
                          <ListItemIcon>
                            <HomeIcon />
                          </ListItemIcon>
                          <ListItemText primary="My anime" />
                        </ListItem>
                        <ListItem button onClick={() => signout()}>
                          <ListItemIcon>
                            <LogoutIcon />
                          </ListItemIcon>
                          <ListItemText primary="Logout" />
                        </ListItem>
                      </List>
                    </Box>
                  </PopperMenuContent>
                </PopperMenu>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default Header;
