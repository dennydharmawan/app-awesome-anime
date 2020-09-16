import { formatDistance } from "date-fns";
import React from "react";

import { Box, makeStyles, Theme } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import {
  SentimentDissatisfiedOutlined,
  SentimentSatisfiedOutlined,
  SentimentVeryDissatisfiedOutlined,
  SentimentVerySatisfiedOutlined
} from "@material-ui/icons";

import { MediaFormat, MediaFragment } from "../generated/graphql";
import toTitleCase from "../lib/toTitleCase";

export interface StyleProps {
  mediaColor: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    width: '100%',
    borderTop: (props) => `6px solid ${props.mediaColor || '#13689E'}`,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  flexGap: {
    //https://coryrylan.com/blog/css-gap-space-with-flexbox
    '--gap': '8px',
    display: 'inline-flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: 'calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap))',
    width: 'calc(100% + var(--gap))',

    '& > *': {
      margin: 'var(--gap) 0 0 var(--gap)',
    },
  },
  darkText: {
    color: 'hsl(0, 0%, 13%)',
    fontWeight: 700,
  },
  greyText: {
    color: 'hsl(0, 0%, 29%)',
    fontWeight: 500,
  },
  lightText: {
    color: 'hsl(0, 0%, 54%)',
    fontWeight: 500,
    fontSize: '1.3rem',
  },
  inlineBox: {
    display: 'inline',
  },
}));

const getDistanceInWords = (s: number) => formatDistance(0, s * 1000);

const getEmoticonRating = (rating: number) => {
  switch (true) {
    case Boolean(rating >= 75):
      return (
        <Box
          color="#43a047"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="small"
        >
          <SentimentVerySatisfiedOutlined />
        </Box>
      );

    case Boolean(rating >= 50):
      return <SentimentSatisfiedOutlined style={{ color: '#8bc34a' }} />;

    case Boolean(rating >= 25):
      return (
        <Box
          color="#fb8c00"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="small"
        >
          <SentimentDissatisfiedOutlined />
        </Box>
      );

    case Boolean(rating >= 0):
      return (
        <Box
          color="#e65100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="small"
        >
          <SentimentVeryDissatisfiedOutlined />
        </Box>
      );

    default:
      return null;
  }
};

type Props = {
  media: MediaFragment;
};

export default function MediaCardTooltip(props: Props) {
  const { media } = props;
  const classes = useStyles({ mediaColor: media?.coverImage?.color as string });
  const bullet = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} elevation={0}>
      <CardContent>
        <Box display="flex" alignItems="flex-start">
          <Box display="flex" flexDirection="column">
            <Typography variant="bold">
              {toTitleCase(media.title?.userPreferred as string)}
            </Typography>
            <Box
              display={
                media.nextAiringEpisode?.timeUntilAiring ? 'block' : 'none'
              }
            >
              <Typography variant="medium" style={{ color: '#6458EE' }}>
                {media.format !== MediaFormat.Movie
                  ? `Ep ${media.nextAiringEpisode?.episode} airing in `
                  : 'Airing in '}
                {media.nextAiringEpisode?.timeUntilAiring &&
                  getDistanceInWords(media.nextAiringEpisode?.timeUntilAiring)}
              </Typography>
            </Box>
          </Box>

          <Box
            display={media.averageScore ? 'flex' : 'none'}
            alignItems="center"
            justifyContent="center"
            ml="auto"
            flexDirection="column"
          >
            {getEmoticonRating(media.averageScore!)}
            <Typography variant="medium">{`${media.averageScore}%`}</Typography>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" mt={2.5} mb={1}>
          <Typography variant="medium" color="textPrimary">
            {media.studios?.edges && media.studios?.edges[0]?.node?.name}
          </Typography>

          <Box display="flex">
            <Typography variant="light">
              {media.format
                ? media.format.replace(/ /g, '_')
                : 'Unknown Format'}
            </Typography>
            <Box
              visibility={
                media.episodes && media.format !== MediaFormat.Movie
                  ? 'visible'
                  : 'hidden'
              }
            >
              <Typography variant="light">
                {bullet}
                {media.episodes} episodes
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className={classes.flexGap}>
          {media.genres?.map((genre, index) => {
            return <Chip size="small" label={genre} key={index} />;
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
