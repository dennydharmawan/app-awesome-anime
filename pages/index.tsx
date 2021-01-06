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
import useSdk from "../lib/useSdk";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'grid',
    gridGap: theme.spacing(4),
    gridTemplateColumns: 'repeat(auto-fit, minmax(112px, 184px))',
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
            <Box sx={{ fontWeight: 700, fontSize: 'h5.fontSize' }}>
              Trending Now
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Button variant="outlined" color="primary">
                View All
              </Button>
            </Box>
          </Box>
          <Box className={classes.cardContainer}>
            {data?.trending?.media &&
              data?.trending?.media.map((media, index) => {
                return (
                  <Grid item key={index}>
                    <MediaCard media={media!} />
                  </Grid>
                );
              })}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
            <Box sx={{ fontWeight: 700, fontSize: 'h5.fontSize' }}>
              Popular this season
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Button variant="outlined" color="primary">
                View All
              </Button>
            </Box>
          </Box>
          <Box className={classes.cardContainer}>
            {data?.season?.media &&
              data?.season?.media.map((media, index) => {
                return (
                  <Grid item key={index}>
                    <MediaCard media={media!} />
                  </Grid>
                );
              })}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
            <Box sx={{ fontWeight: 700, fontSize: 'h5.fontSize' }}>
              Upcoming
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Button variant="outlined" color="primary">
                View All
              </Button>
            </Box>
          </Box>
          <Box className={classes.cardContainer}>
            {data?.nextSeason?.media &&
              data?.nextSeason?.media.map((media, index) => {
                return (
                  <Grid item key={index}>
                    <MediaCard media={media!} />
                  </Grid>
                );
              })}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
            <Box sx={{ fontWeight: 700, fontSize: 'h5.fontSize' }}>
              Popular all time
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Button variant="outlined" color="primary">
                View All
              </Button>
            </Box>
          </Box>
          <Box className={classes.cardContainer}>
            {data?.popular?.media &&
              data?.popular?.media.map((media, index) => {
                return (
                  <Grid item key={index}>
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

export default index;
