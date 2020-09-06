import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";

import { getSdk, PokemonQuery } from "../../../generated/graphql";
import client from "../../../graphql/client";

type Props = {
  data: PokemonQuery;
};

const pokemonDetail = (props: Props) => {
  const { data } = props;

  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (!data?.pokemon?.id) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }
  console.log(data);

  return (
    <div>
      test
      <div>{data.pokemon?.name}</div>
      <div>{data.pokemon?.height}</div>
      <div>{data.pokemon?.weight}</div>
    </div>
  );
};

// This gets called on every request
//https://www.youtube.com/watch?v=yGuN_9rng6o
export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const name = ctx?.params?.name as string;
  const sdk = getSdk(client);

  const data = await sdk.pokemon({
    name,
  });

  return {
    props: { data },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  // only generate these pages, the rest will be generated on demand
  return {
    paths: [
      { params: { name: 'bulbasaur' } },
      { params: { name: 'ivysaur' } },
      { params: { name: 'venusaur' } },
    ],
    fallback: true, // if page is not generated, we will try to generate it on runtime
  };
}

export default pokemonDetail;
