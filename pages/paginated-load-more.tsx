import React from "react";
import { InView, useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  makeStyles
} from "@material-ui/core";

import Layout from "../components/Layout";
import PokemonCard from "../components/PokemonCard";
import { getSdk, PokemonItem, PokemonsQuery } from "../generated/graphql";
import client from "../graphql/client";

//https://www.npmjs.com/package/react-intersection-observer
//https://react-intersection-observer.now.sh/?path=/story/useinview-hook--basic

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  cardContainer: {
    display: 'grid',
    gridGap: theme.spacing(2),
    gridTemplateColumns: 'repeat(auto-fit, minmax(345px, 1fr))',
    justifyContent: 'center',
    maxHeight: 500,
    overflowY: 'scroll',
    marginTop: theme.spacing(2),
  },
}));

const index = () => {
  const classes = useStyles();
  const sdk = getSdk(client);
  const POKEMONS_PER_PAGE = 6;

  const [ref, inView, entry] = useInView();

  const {
    status,
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
    isLoading,
  } = useInfiniteQuery(
    'pokemons',
    (key, next: number = 0) => {
      return sdk.pokemons({
        limit: POKEMONS_PER_PAGE - 1,
        offset: next * POKEMONS_PER_PAGE + 1,
      });
    },
    {
      getFetchMore: (lastGroup, allGroups) => {
        return allGroups.length;
      },
    }
  );

  if (isLoading) {
    return (
      <Layout>
        <Container maxWidth="lg" className={classes.root}>
          <Backdrop open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" className={classes.root}>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => fetchMore()}
            // disabled={(!canFetchMore || isFetchingMore) as boolean}
          >
            {isFetchingMore
              ? 'Loading more...'
              : canFetchMore
              ? 'Load More'
              : 'Nothing more to load'}
          </Button>
        </Box>
        <Box className={classes.cardContainer}>
          {data &&
            data.map((group: PokemonsQuery, i: number) => {
              return (
                <React.Fragment key={i}>
                  {group?.pokemons?.results &&
                    group.pokemons.results.map((pokemon, index) => {
                      return (
                        <PokemonCard
                          pokemon={pokemon as PokemonItem}
                          key={index}
                        />
                      );
                    })}
                </React.Fragment>
              );
            })}
          {canFetchMore && (
            <InView
              as="div"
              onChange={(inView, entry) => {
                if (inView) {
                  fetchMore();
                }
              }}
            >
              <h2>Loading more...</h2>
            </InView>
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default index;
