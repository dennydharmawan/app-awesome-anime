import Head from "next/head";
import { ReactNode } from "react";

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

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Awesome Anime | Anime Streaming Platform</title>
        {/* <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://leerob.io${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Lee Robinson" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@leeerob" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )} */}
      </Head>
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
    </>
  );
}

export default Layout;
