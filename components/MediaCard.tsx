import { signin, signout, useSession } from "next-auth/client";
import Image from "next/image";
import React from "react";

import { Box, IconButton, Tooltip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

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
      transform: 'scale(1.1)',
    },
  },
  mediaTitle: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
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
  const [session] = useSession();
  const classes = useStyles();

  const title = media.title?.userPreferred || 'Unknown Title';

  return (
    <Card className={classes.root} elevation={0}>
      <CardActionArea
        component={Link as React.ElementType}
        href={`/anime/${media.id}/${toSlugFormat(title)}`}
      >
        <Tooltip
          title={<MediaCardTooltip media={media} />}
          placement="right"
          arrow
          classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
        >
          <Box sx={{ overflow: 'hidden', position: 'relative' }}>
            <CardMedia
              className={classes.media}
              image={media.coverImage?.large as string}
              title={media.title?.userPreferred as string}
            />
          </Box>
        </Tooltip>

        <CardContent classes={{ root: classes.mediaTitle }}>
          <Typography color="textPrimary" noWrap>
            {toTitleCase(title)}
          </Typography>

          {session && (
            <Tooltip title="Bookmark">
              <IconButton
                aria-label="Bookmark"
                size="small"
                sx={{
                  marginLeft: 'auto',
                  ':hover': {
                    backgroundColor: 'rgba(31,38,49, 0.7)',
                    color: '#fff',
                  },
                }}
              >
                <BookmarkBorderIcon />
              </IconButton>
            </Tooltip>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MediaCard;
