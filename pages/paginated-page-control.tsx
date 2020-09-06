import axios from "axios";
import { useState } from "react";
import { usePaginatedQuery, useQuery } from "react-query";

import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  fade,
  InputBase,
  makeStyles,
  Paper
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";

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
    gridTemplateColumns: 'repeat(auto-fit, minmax(345px, max-content))',
    justifyContent: 'center',
  },
  paginationContainer: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    alignItems: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
    boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '20ch',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '5px',
  },
}));

const index = () => {
  const classes = useStyles();
  const sdk = getSdk(client);
  const [page, setPage] = useState(0);
  const [term, setTerm] = useState<string | null>(null);

  const POKEMONS_PER_PAGE = 20;

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

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
        <Box className={classes.paginationContainer}>
          <Pagination
            page={page + 1}
            count={Math.round(
              (resolvedData?.pokemons?.count || 0) / POKEMONS_PER_PAGE
            )}
            color="primary"
            onChange={handleChange}
            siblingCount={2}
            boundaryCount={2}
            showFirstButton
            showLastButton
          />
          {isFetching && <CircularProgress size={28} />}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search pokemon..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={term || ''}
              onChange={(event) => setTerm(event.target.value)}
            />
          </div>
        </Box>

        <Box className={classes.cardContainer}>
          {resolvedData?.pokemons?.results &&
            resolvedData.pokemons.results
              .filter((pokemon) => {
                if (!pokemon?.name) {
                  return true;
                } else {
                  return pokemon.name.includes(term?.toLowerCase() || '');
                }

                return false;
              })
              .map((pokemon, index) => {
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
