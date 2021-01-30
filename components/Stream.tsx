import axios from "axios";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import AspectRatio from "react-aspect-ratio";
import { useQuery } from "react-query";

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  makeStyles
} from "@material-ui/core";

import { EpisodeGroup, MultiStreamUrl } from "../lib/types";

type Props = {
  id: string;
  name: string;
  numberOfEpisodes: number;
  episodePerPage: number;
  dataEpisodes: any;
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.appBar - 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
  flexGap: {
    '--gap': '8px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: 'calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap))',
    width: 'calc(100% + var(--gap))',

    '& > *': {
      margin: 'var(--gap) 0 0 var(--gap)',
    },
  },
  currentEpisode: {
    color: 'yellow',
  },
}));

const Stream = (props: Props) => {
  const { id, name, numberOfEpisodes, episodePerPage, dataEpisodes } = props;
  const [currentEpisode, setCurrentEpisode] = useState<number>(1);
  const [currentGroup, setCurrentGroup] = useState<number>(1);
  const classes = useStyles();

  const {
    status: statusStream,
    data: dataStream,
    error: errorStream,
  } = useQuery<MultiStreamUrl | null>(
    ['stream', { id, name, episode: currentEpisode }],
    () =>
      axios
        .post('/api/streams', {
          url: dataEpisodes && dataEpisodes[currentEpisode - 1].url,
        })
        .then((response) => {
          return response.data.data || null;
        }),
    {
      enabled: Boolean(id && name && dataEpisodes),
    }
  );

  let episodeGroups: EpisodeGroup = {};
  let i;
  for (i = 0; i <= Math.ceil(numberOfEpisodes / episodePerPage) - 1; i++) {
    episodeGroups[i + 1] = {
      start: i * episodePerPage + 1,
      end: Math.min((i + 1) * episodePerPage, numberOfEpisodes),
    };
  }

  if (numberOfEpisodes === 0) {
    return (
      <Box sx={{ width: '100%' }}>
        <AspectRatio ratio="16/9">
          <Backdrop className={classes.backdrop} open={true}>
            {`Oops... We can't find any episodes related to this anime.`}
          </Backdrop>
        </AspectRatio>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <AspectRatio ratio="16/9">
        {dataStream ? (
          <iframe src={dataStream.url} frameBorder="0" allowFullScreen />
        ) : (
          <Backdrop className={classes.backdrop} open={true}>
            Loading stream
            <Box sx={{ mt: 2 }}>
              <CircularProgress color="inherit" />
            </Box>
          </Backdrop>
        )}
      </AspectRatio>

      <Box sx={{ mt: 2, mb: 0.5 }}>
        <Box className={classes.flexGap}>
          {Object.entries(episodeGroups).map(([key, value]) => {
            return (
              <Button
                variant="text"
                onClick={() => setCurrentGroup(parseInt(key))}
                key={key}
              >{`${value.start}-${value.end}`}</Button>
            );
          })}
        </Box>
      </Box>

      <Box className={classes.flexGap}>
        {(() => {
          const { start, end } = episodeGroups[currentGroup];

          const buttons = [];
          for (let index = start; index <= end; index++) {
            buttons.push(
              <Button
                size="small"
                variant={currentEpisode === index ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => setCurrentEpisode(index)}
                disableElevation
                key={nanoid()}
              >
                {index}
              </Button>
            );
          }

          return buttons;
        })()}
      </Box>
    </Box>
  );
};

export default Stream;

/*
(() => {
                const numberOfEpisodes = 144;
                const episodePerPage = 100;
                let episodeGroups: EpisodeGroup = {};
                let i;
                for (
                  i = 0;
                  i <= Math.ceil(numberOfEpisodes / episodePerPage) - 1;
                  i++
                ) {
                  episodeGroups[i] = {
                    start: i * episodePerPage + 1,
                    end: (i + 1) * episodePerPage,
                  };
                }

                return Object.entries(
                  episodeGroups
                ).map(([key, value], index) => {
                  return <Box></Box>
                });
              })()
*/
