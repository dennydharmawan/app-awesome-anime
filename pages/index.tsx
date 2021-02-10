import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/client";
import { useQuery } from "react-query";

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";

import Layout from "../components/Layout";
import MediaCard from "../components/MediaCard";
import MediaCardTooltip from "../components/MediaCardTooltip";
import { Media, MediaFragment, MediaSeason } from "../generated/graphql";
import { requirePageAuth } from "../lib/requirePageAuth";
import useSdk from "../lib/useSdk";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'grid',
    gridGap: theme.spacing(4),
    gridTemplateColumns: 'repeat(auto-fill, minmax(184px, 1fr))',
    justifyContent: 'center',
    overflow: 'hidden',
  },
}));

//TODO optimize images
//https://twitter.com/wongmjane/status/1293076852190220288
//use next-optimize-image preload with lqip
const index = () => {
  const classes = useStyles();

  const sdk = useSdk();
  const { status, data, error } = useQuery('animes', () =>
    sdk.AnimeDashboard({
      nextSeason: MediaSeason.Spring, // TODO: make this dynamic
      nextYear: 2021,
      season: MediaSeason.Winter,
      seasonYear: 2021,
    })
  );

  if (status === 'loading') {
    return (
      <Layout>
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Layout>
    );
  }
  // TODO error handling
  // TODO show recently released episode for this week

  return (
    <Layout>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
            <Box>
              <Typography
                variant="h5"
                color="initial"
                sx={{ fontWeight: 'bold' }}
              >
                Trending Now
              </Typography>
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Button variant="outlined" color="primary">
                View All
              </Button>
            </Box>
          </Box>
          <Box className={classes.cardContainer}>
            {data?.trending?.media &&
              data?.trending?.media.map((media) => {
                return (
                  <Grid item key={media?.id}>
                    <MediaCard media={media!} />
                  </Grid>
                );
              })}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
            <Box>
              <Typography
                variant="h5"
                color="initial"
                sx={{ fontWeight: 'bold' }}
              >
                Popular this season
              </Typography>
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Button variant="outlined" color="primary">
                View All
              </Button>
            </Box>
          </Box>
          <Box className={classes.cardContainer}>
            {data?.season?.media &&
              data?.season?.media.map((media) => {
                return (
                  <Grid item key={media?.id}>
                    <MediaCard media={media!} />
                  </Grid>
                );
              })}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
            <Box>
              <Typography
                variant="h5"
                color="initial"
                sx={{ fontWeight: 'bold' }}
              >
                Upcoming
              </Typography>
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Button variant="outlined" color="primary">
                View All
              </Button>
            </Box>
          </Box>
          <Box className={classes.cardContainer}>
            {data?.nextSeason?.media &&
              data?.nextSeason?.media.map((media) => {
                return (
                  <Grid item key={media?.id}>
                    <MediaCard media={media!} />
                  </Grid>
                );
              })}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
            <Box>
              <Typography
                variant="h5"
                color="initial"
                sx={{ fontWeight: 'bold' }}
              >
                Popular all time
              </Typography>
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Button variant="outlined" color="primary">
                View All
              </Button>
            </Box>
          </Box>
          <Box className={classes.cardContainer}>
            {data?.popular?.media &&
              data?.popular?.media.map((media) => {
                return (
                  <Grid item key={media?.id}>
                    <MediaCard media={media!} />
                  </Grid>
                );
              })}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

// https://next-auth.js.org/tutorials/securing-pages-and-api-routes#client-side
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}

export default index;
