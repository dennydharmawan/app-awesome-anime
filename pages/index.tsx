import axios from "axios";
import { useQuery } from "react-query";

import {
  Backdrop,
  Box,
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

  const { status, data, error } = useQuery('pokemons', () => sdk.pokemons());

  if (status === 'loading') {
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
          {data?.pokemons?.results &&
            data.pokemons.results.map((pokemon, index) => {
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
