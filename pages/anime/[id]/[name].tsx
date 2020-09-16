import axios from "axios";
import format from "date-fns/format";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import { makeQueryCache, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import {
  Backdrop,
  Box,
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
    flexGrow: 1,
    padding: theme.spacing(1.5),
  },
  bannerCard: {
    borderRadius: '0px',
  },
  bannerMedia: {
    height: '500px',
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
    '--gap': '32px',
    display: 'inline-flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    margin: 'calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap))',
    width: 'calc(100% + var(--gap))',

    '& > *': {
      margin: 'var(--gap) 0 0 var(--gap)',
    },
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

  const sdk = useSdk();
  const { status, data, error } = useQuery(
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
    status: statusStream,
    data: dataStream,
    error: errorStream,
  } = useQuery<{
    url: string;
  } | null>(
    ['stream', { id, name, episode: 1 }],
    () =>
      axios
        .post(
          '/api/streams',
          {
            url: 'https://gogoanime.so/black-clover-episode-1',
          },
          {
            baseURL: 'http://localhost:3000',
          }
        )
        .then((response) => {
          return response.data.data || null;
        }),
    {
      enabled: id && name,
    }
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

  return (
    <>
      <Header />
      <Box className={classes.heroContent}>
        <Card className={classes.bannerCard} elevation={0}>
          <CardMedia
            className={classes.bannerMedia}
            image={data?.Media?.bannerImage || ''}
            component={'div'}
          />
        </Card>

        <Container maxWidth="lg">
          <Box display="flex">
            <Box display="flex">
              <Card className={classes.coverCard} elevation={0}>
                <CardMedia
                  className={classes.coverMedia}
                  image={data?.Media?.coverImage?.large || ''}
                  component={'div'}
                />
              </Card>
            </Box>
            <Box display="flex" flexDirection="column" flexGrow={1} p={3}>
              <Typography variant="bold">
                {data?.Media?.title?.userPreferred}
              </Typography>
              <div
                style={{
                  lineHeight: '1.82',
                  color: 'hsl(0, 0%, 29%)',
                  fontWeight: 500,
                  fontSize: '1.4rem',
                }}
                dangerouslySetInnerHTML={{
                  __html: data?.Media?.description as string,
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
              <KeyValueVertical keyAs="Format" value={data?.Media?.format} />
              <KeyValueVertical
                keyAs="Episodes"
                value={data?.Media?.episodes?.toString()}
              />
              <KeyValueVertical
                keyAs="Duration per Episode"
                value={`${data?.Media?.duration} mins`}
              />
              <KeyValueVertical keyAs="Status" value={data?.Media?.status} />
              <KeyValueVertical
                keyAs="Start Date"
                value={
                  data?.Media?.startDate &&
                  format(
                    new Date(
                      data?.Media?.startDate?.year!,
                      data?.Media?.startDate?.month!,
                      data?.Media?.startDate?.day!
                    ),
                    'MMM dd, yyyy'
                  )
                }
              />
              <KeyValueVertical
                keyAs="Season"
                value={`${data?.Media?.season} ${data?.Media?.seasonYear}`}
              />
              <KeyValueVertical
                keyAs="Average Score"
                value={`${data?.Media?.averageScore}%`}
              />
              <KeyValueVertical
                keyAs="Mean Score"
                value={`${data?.Media?.meanScore}%`}
              />
              <KeyValueVertical
                keyAs="Popularity"
                value={`${data?.Media?.popularity}`}
              />
              <KeyValueVertical
                keyAs="Producers"
                value={
                  data?.Media?.studios?.edges &&
                  data?.Media?.studios?.edges[0]?.node?.name
                }
              />
              <KeyValueVertical
                keyAs="Source"
                value={data?.Media?.source || ''}
              />
              <KeyValueVertical
                keyAs="Hashtag"
                value={data?.Media?.hashtag || ''}
              />
              <KeyValueVertical
                keyAs="Genres"
                value={data?.Media?.genres?.join(', ')}
              />
              <KeyValueVertical
                keyAs="Romaji"
                value={data?.Media?.title?.romaji}
              />
              <KeyValueVertical
                keyAs="English"
                value={data?.Media?.title?.english}
              />
              <KeyValueVertical
                keyAs="Native"
                value={data?.Media?.title?.native}
              />
              <KeyValueVertical
                keyAs="Synonyms"
                value={data?.Media?.synonyms?.join(', ')}
              />
              <KeyValueVertical keyAs="Hashtag" value={data?.Media?.hashtag} />
            </Box>
            <Box className={classes.mainContent}>
              <AspectRatio ratio="16/9" style={{ maxWidth: '560px' }}>
                {dataStream ? (
                  <iframe
                    src={dataStream.url}
                    frameBorder="0"
                    allowFullScreen
                  />
                ) : (
                  <div>Can't find video Stream</div>
                )}
              </AspectRatio>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

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

export default pageDetail;
