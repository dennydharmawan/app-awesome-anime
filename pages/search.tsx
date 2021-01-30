import React, { useEffect, useState } from "react";
import { InView, useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQuery } from "react-query";

import {
  alpha,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import Layout from "../components/Layout";
import MediaCard from "../components/MediaCard";
import { MediaSort, MediaType } from "../generated/graphql";
import useSdk from "../lib/useSdk";

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    display: 'inline-block',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '240px',
    transition: theme.transitions.create('width'),
    '&:focus': {
      width: '360px',
    },
  },
  cardContainer: {
    display: 'grid',
    gridGap: theme.spacing(4),
    gridTemplateColumns: 'repeat(auto-fill, minmax(184px, 1fr))',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const search = () => {
  const classes = useStyles();
  const sdk = useSdk();
  const [ref, inView, entry] = useInView();
  const [term, setTerm] = useState<string>('');
  const [debouncedTerm, setDebouncedTerm] = useState<string>(term);
  const DEBOUNCE_IN_MS = 500;
  useEffect(() => {
    const timoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, DEBOUNCE_IN_MS);

    return () => {
      clearTimeout(timoutId);
    };
  }, [term]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['search', debouncedTerm],
    ({ pageParam = 1 }) => {
      return sdk.AnimeSearch({
        page: pageParam,
        search: debouncedTerm,
        sort: MediaSort.SearchMatch,
        type: MediaType.Anime,
      });
    },
    {
      enabled: !!debouncedTerm,
      getNextPageParam: (lastPage, allPage) => {
        if (
          lastPage?.Page?.pageInfo?.hasNextPage &&
          lastPage?.Page?.pageInfo?.currentPage
        ) {
          return lastPage?.Page?.pageInfo?.currentPage + 1;
        }
      },
    }
  );

  return (
    <Layout>
      <Box sx={{ display: 'flex', paddingBottom: '16px' }}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={term}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        {status === 'loading' && (
          <Box sx={{ pl: '16px' }}>
            <CircularProgress color="inherit" />
          </Box>
        )}
      </Box>
      {/* the button below is to help debugging useInfiniteScroll */}
      {/* <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => fetchNextPage()}
          // disabled={(!canFetchMore || isFetchingMore) as boolean}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>
      </Box> */}
      {status !== 'loading' &&
        debouncedTerm &&
        data?.pages?.[0]?.Page?.media &&
        data?.pages?.[0]?.Page?.media.length === 0 && <Box>No result</Box>}
      <Box className={classes.cardContainer}>
        {data &&
          data?.pages.map((page) => {
            return (
              page?.Page?.media &&
              page?.Page?.media.map((media, index) => {
                return (
                  <Grid item key={index}>
                    <MediaCard media={media!} />
                  </Grid>
                );
              })
            );
          })}
        {hasNextPage && (
          <InView
            as="div"
            onChange={(inView, entry) => {
              if (inView) {
                fetchNextPage();
              }
            }}
          >
            <h2>Loading more...</h2>
          </InView>
        )}
      </Box>
    </Layout>
  );
};

export default search;
