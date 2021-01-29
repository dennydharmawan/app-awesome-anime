import { GetStaticProps } from "next";
import { providers, signIn } from "next-auth/client";
import { Providers } from "next-auth/providers";
import { useRouter } from "next/router";
import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Awesome Anime
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type props = {
  providers: Providers;
};

export default function SignIn({ providers }: props) {
  const classes = useStyles();
  const {
    query: { callbackUrl },
  } = useRouter();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in to Awesome Anime
        </Typography>

        <div className={classes.root}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              margin: '24px 0',
            }}
          >
            {Object.values(providers).map((provider) => (
              <Button
                key={provider.id}
                variant="outlined"
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl:
                      (callbackUrl as string) || process.env.NEXT_PUBLIC_SITE,
                  })
                }
              >
                Sign in with {provider.name}
              </Button>
            ))}
          </Box>
          <Divider variant="middle">
            <Typography variant="subtitle1" color="initial">
              OR
            </Typography>
          </Divider>
          <Box>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled // TODO: enable this
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Join for free"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </div>
      </div>
      <Box sx={{ mt: '24px' }}>
        <Copyright />
      </Box>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      providers: await providers(),
    },
  };
};
