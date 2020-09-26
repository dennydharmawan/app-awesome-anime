import axios from "axios";
import format from "date-fns/format";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { makeQueryCache, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import {
  Backdrop,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  makeStyles,
  Typography
} from "@material-ui/core";

import Header from "../../../components/Header";
import KeyValueVertical from "../../../components/KeyValueVertical";
import Layout from "../../../components/Layout";
import StreamEpisodeControl from "../../../components/Stream";
import { getSdk, MediaQuery } from "../../../generated/graphql";
import { initializeClient } from "../../../graphql/client";
import { Episode, EpisodeGroup, MultiStreamUrl } from "../../../lib/types";
import useSdk from "../../../lib/useSdk";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  sidebar: {
    display: 'grid',
    gridAutoFlow: 'row',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    boxShadow: '0 2px 6px 0 hsla(0, 0%, 0%, 0.2)',
    borderRadius: '3px',
    gap: '12px',
    gridTemplateColumns: 'minmax(min-content, 204px)',
  },
  mainContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: '#E5EBF1',
    minHeight: '100vh',
  },
  mainContent: {
    display: 'flex',
    padding: theme.spacing(1.5),
  },
  bannerCard: {
    borderRadius: '0px',
  },
  bannerMedia: {
    height: '352px',
    borderRadius: '0px',
  },
  coverCard: {
    width: '184px',
    marginTop: '-50%',
    border: '4px solid #fff',
  },
  coverMedia: {
    height: '180px',
    paddingTop: '150%',
  },
  flexGap: {
    display: 'grid',
    gridTemplateColumns: 'minmax(150px, 25%) 1fr',
    gap: '24px',
  },
  greyText: {
    color: 'hsl(0, 0%, 29%)',
    fontWeight: 500,
  },
  lightText: {
    color: 'hsl(0, 0%, 54%)',
    fontWeight: 500,
    fontSize: '0.875rem',
  },
}));

type Episodes = {
  id: number;
  episode: number;
  url: string;
}[];

type SearchResponse = {
  episodes: Episodes;
}[];

type Props = {
  data: {
    episodes: Episodes;
  };
};
const pageDetail = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id, name } = router.query;
  const [activeEpisode, setActiveEpisode] = useState<number>(1);

  const sdk = useSdk();
  const { status: statusAnime, data: dataAnime, error: errorAnime } = useQuery(
    ['anime', { id, name }],
    () =>
      sdk.media({
        id: parseInt(id as string),
      }),
    {
      enabled: id && name,
    }
  );

  const {
    status: statusEpisodes,
    data: dataEpisodes,
    error: errorEpisodes,
  } = useQuery<Episode[]>(
    ['episodes', { id, name }],
    () =>
      axios('/api/animes', {
        baseURL: 'http://localhost:3000',
        params: {
          keyword: (name as string).replace(/-/g, ' '),
        },
      }).then((response) => {
        return response.data.data || null;
      }),
    {
      enabled: id && name,
    }
  );

  if (statusAnime === 'loading' || statusEpisodes === 'loading') {
    return (
      <Layout>
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Layout>
    );
  }

  return (
    <>
      <Header />
      <Box className={classes.heroContent}>
        <Card className={classes.bannerCard} elevation={0}>
          <CardMedia
            className={classes.bannerMedia}
            image={dataAnime?.Media?.bannerImage || ''}
            component={'div'}
          />
        </Card>

        <Container maxWidth="lg">
          <Box display="flex">
            <Box display="flex">
              <Card className={classes.coverCard} elevation={0}>
                <CardMedia
                  className={classes.coverMedia}
                  image={dataAnime?.Media?.coverImage?.large || ''}
                  component={'div'}
                />
              </Card>
            </Box>
            <Box display="flex" flexDirection="column" flexGrow={1} p={3}>
              <Typography variant="bold">
                {dataAnime?.Media?.title?.userPreferred}
              </Typography>
              <div
                style={{
                  lineHeight: '1.82',
                  color: 'hsl(0, 0%, 29%)',
                  fontWeight: 500,
                  fontSize: '1.4rem',
                }}
                dangerouslySetInnerHTML={{
                  __html: dataAnime?.Media?.description as string,
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      <Box className={classes.mainContainer}>
        <Container maxWidth="lg">
          <Box className={classes.flexGap}>
            <Box className={classes.sidebar}>
              <KeyValueVertical
                keyAs="Format"
                value={dataAnime?.Media?.format}
              />
              <KeyValueVertical
                keyAs="Episodes"
                value={dataAnime?.Media?.episodes?.toString()}
              />
              <KeyValueVertical
                keyAs="Duration per Episode"
                value={`${dataAnime?.Media?.duration} mins`}
              />
              <KeyValueVertical
                keyAs="Status"
                value={dataAnime?.Media?.status}
              />
              <KeyValueVertical
                keyAs="Start Date"
                value={
                  dataAnime?.Media?.startDate &&
                  format(
                    new Date(
                      dataAnime?.Media?.startDate?.year!,
                      dataAnime?.Media?.startDate?.month!,
                      dataAnime?.Media?.startDate?.day!
                    ),
                    'MMM dd, yyyy'
                  )
                }
              />
              <KeyValueVertical
                keyAs="Season"
                value={`${dataAnime?.Media?.season} ${dataAnime?.Media?.seasonYear}`}
              />
              <KeyValueVertical
                keyAs="Average Score"
                value={`${dataAnime?.Media?.averageScore}%`}
              />
              <KeyValueVertical
                keyAs="Mean Score"
                value={`${dataAnime?.Media?.meanScore}%`}
              />
              <KeyValueVertical
                keyAs="Popularity"
                value={`${dataAnime?.Media?.popularity}`}
              />
              <KeyValueVertical
                keyAs="Producers"
                value={
                  dataAnime?.Media?.studios?.edges &&
                  dataAnime?.Media?.studios?.edges[0]?.node?.name
                }
              />
              <KeyValueVertical
                keyAs="Source"
                value={dataAnime?.Media?.source || ''}
              />
              <KeyValueVertical
                keyAs="Hashtag"
                value={dataAnime?.Media?.hashtag || ''}
              />
              <KeyValueVertical
                keyAs="Genres"
                value={dataAnime?.Media?.genres?.join(', ')}
              />
              <KeyValueVertical
                keyAs="Romaji"
                value={dataAnime?.Media?.title?.romaji}
              />
              <KeyValueVertical
                keyAs="English"
                value={dataAnime?.Media?.title?.english}
              />
              <KeyValueVertical
                keyAs="Native"
                value={dataAnime?.Media?.title?.native}
              />
              <KeyValueVertical
                keyAs="Synonyms"
                value={dataAnime?.Media?.synonyms?.join(', ')}
              />
              <KeyValueVertical
                keyAs="Hashtag"
                value={dataAnime?.Media?.hashtag}
              />
            </Box>
            <Box className={classes.mainContent}>
              <StreamEpisodeControl
                id={id as string}
                name={name as string}
                numberOfEpisodes={144}
                episodePerPage={100}
                dataEpisodes={dataEpisodes}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

/*
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const mediaName: string = (ctx.params?.name as string) || '';
  const keyword = mediaName.replace(/-/g, ' ');
  const queryCache = makeQueryCache();

  const episodes: { url: string }[] = await queryCache.prefetchQuery(
    ['episodes', { id: ctx.params?.id, name: ctx.params?.name }],
    () =>
      axios('/api/animes', {
        baseURL: 'http://localhost:3000',
        params: {
          keyword,
        },
      }).then((response) => {
        return response.data.data || null;
      })
  );

  if (episodes) {
    const stream = await queryCache.prefetchQuery(
      ['stream', { id: ctx.params?.id, name: ctx.params?.name, episode: 1 }],
      () =>
        axios
          .post(
            '/api/streams',
            {
              url: episodes[0].url,
            },
            {
              baseURL: 'http://localhost:3000',
            }
          )
          .then((response) => {
            return response.data.data || null;
          })
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
      data: { totalEpisodes: episodes.length + 1 },
    },
  };
};
*/

export default pageDetail;
