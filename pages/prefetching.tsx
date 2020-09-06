import axios from "axios";
import { useState } from "react";
import { queryCache, usePaginatedQuery } from "react-query";

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
import {
  getSdk,
  PokemonItem,
  PokemonsDocument,
  PokemonsQuery
} from "../generated/graphql";
import client from "../graphql/client";

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
  },
}));

const index = () => {
  const classes = useStyles();
  const sdk = getSdk(client);
  const [page, setPage] = useState(0);

  const POKEMONS_PER_PAGE = 20;

  const {
    isLoading,
    isError,
    error,
    resolvedData,
    latestData,
    isFetching,
  } = usePaginatedQuery(['pokemons', page], () =>
    sdk.pokemons({
      limit: POKEMONS_PER_PAGE - 1,
      offset: page * POKEMONS_PER_PAGE + 1,
    })
  );

  // The results of this query will be cached like a normal query
  const nextPage = page + 1;
  const prefectNextPage = async () => {
    const queryData = await queryCache.prefetchQuery(
      ['pokemons', nextPage],
      () =>
        sdk.pokemons({
          limit: POKEMONS_PER_PAGE - 1,
          offset: nextPage * POKEMONS_PER_PAGE + 1,
        })
    );
  };

  prefectNextPage();

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
        <Box className={classes.cardContainer}>
          <span>Current Page: {page + 1}</span>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            Previous Page
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              setPage((old) =>
                !latestData || !latestData.pokemons?.next ? old : old + 1
              )
            }
            disabled={!latestData || !latestData.pokemons?.next}
          >
            Next Page
          </Button>
          {resolvedData?.pokemons?.results &&
            resolvedData.pokemons.results.map((pokemon, index) => {
              return (
                <PokemonCard pokemon={pokemon as PokemonItem} key={index} />
              );
            })}
        </Box>
      </Container>
    </Layout>
  );
};

export default index;
