import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { getSdk, PokemonQuery } from "../../../../generated/graphql";
import client from "../../../../graphql/client";

type Props = {
  data: PokemonQuery;
};

const pokemonDetail = (props: Props) => {
  const route = useRouter();
  const name = route.query.name as string;

  const sdk = getSdk(client);
  const { data } = useQuery(
    ['pokemon', name],
    () =>
      sdk.pokemon({
        name,
      }),
    {
      initialData: props.data,
    }
  );

  return (
    <div>
      <div>{data?.pokemon?.name}</div>
      <div>{data?.pokemon?.height}</div>
      <div>{data?.pokemon?.weight}</div>
    </div>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const name = ctx?.params?.name as string;
  const sdk = getSdk(client);

  const data = await sdk.pokemon({
    name,
  });

  console.log(data);

  // Pass data to the page via props
  return { props: { data } };
};

export default pokemonDetail;
