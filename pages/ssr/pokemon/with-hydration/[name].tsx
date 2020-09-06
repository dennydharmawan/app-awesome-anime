import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { makeQueryCache, queryCache, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import { Container, makeStyles } from "@material-ui/core";

import PokemonDetailCard from "../../../../components/PokemonDetailCard";
import { getSdk, Pokemon, PokemonQuery } from "../../../../generated/graphql";
import client from "../../../../graphql/client";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8),
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
    gridTemplateColumns: '480px',
  },
}));

const pokemonDetail = () => {
  const classes = useStyles();
  const route = useRouter();
  const name = route.query.name as string;

  const sdk = getSdk(client);
  const { data } = useQuery(['pokemon', name], () =>
    sdk.pokemon({
      name,
    })
  );

  return (
    <Container classes={{ root: classes.container }} maxWidth="md">
      <PokemonDetailCard pokemon={data?.pokemon as Pokemon} />
    </Container>
  );
};

//https://react-query.tanstack.com/docs/guides/ssr
// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const name = ctx?.params?.name as string;
  const sdk = getSdk(client);

  const queryCache = makeQueryCache();
  await queryCache.prefetchQuery(['pokemon', name], () =>
    sdk.pokemon({
      name,
    })
  );

  return { props: { dehydratedState: dehydrate(queryCache) } };
};

export default pokemonDetail;
