import Image from "next/image";
import React from "react";

import { Box, Tooltip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import theme from "../constants/theme";
import { MediaFragment } from "../generated/graphql";
import toSlugFormat from "../lib/toSlugFormat";
import toTitleCase from "../lib/toTitleCase";
import Link from "./Link";
import MediaCardTooltip from "./MediaCardTooltip";

const useStyles = makeStyles({
  root: {
    maxWidth: '184px',
    boxShadow: '0 2px 6px 0 hsla(0, 0%, 0%, 0.2)',
  },
  media: {
    height: 0,
    paddingTop: '150%', // 2:3 aspect ratio
    overflow: 'hidden',
    transition: 'transform .5s ease',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  mediaTitle: {
    padding: theme.spacing(1),
  },
  tooltip: {
    border: 0,
    backgroundColor: 'white',
    boxShadow: '0 15px 35px 0 rgba(42,51,83,.12),0 5px 15px rgba(0,0,0,.06)',
    padding: '0',
    maxWidth: '400px',
    minWidth: '304px',
  },
  arrow: {
    color: 'white',
  },
});

type Props = {
  media: MediaFragment;
};

export const MediaCard = (props: Props) => {
  const { media } = props;

  const classes = useStyles();

  const title = media.title?.userPreferred || 'Unknown Title';

  return (
    <Tooltip
      title={
        <React.Fragment>
          <MediaCardTooltip media={media} />
        </React.Fragment>
      }
      placement="right"
      arrow
      classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
    >
      <Card className={classes.root} elevation={0}>
        <CardActionArea
          component={Link as React.ElementType}
          href={`/anime/${media.id}/${toSlugFormat(title)}`}
        >
          <Box sx={{ overflow: 'hidden' }}>
            {/* <CardMedia
              className={classes.media}
              image={media.coverImage?.large as string}
              title={media.title?.userPreferred as string}
            /> */}
            <Image
              src={(media.coverImage?.large as string) || ''}
              alt={(media.title?.userPreferred as string) || ''}
              width={184}
              height={260}
            />
          </Box>

          <CardContent classes={{ root: classes.mediaTitle }}>
            <Typography color="textPrimary" noWrap>
              {toTitleCase(title)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Tooltip>
  );
};

export default MediaCard;
