import { GetStaticPaths, GetStaticProps, NextPageContext } from "next";
import { Session } from "next-auth/client";

import { requirePageAuth } from "../lib/requirePageAuth";

type Props = {
  session: Session;
};

function Home({ session }: Props) {
  return <div>Under Construction</div>;
}

export const getServerSideProps = requirePageAuth(
  (context: NextPageContext, session: Session) => {
    console.log(context);
    console.log(session);
    // fetch data here

    return {
      props: { session },
    };
  }
);

export default Home;
