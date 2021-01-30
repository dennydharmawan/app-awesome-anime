import { getSession } from 'next-auth/client';

//https://leerob.io/blog/nextjs-authentication
export const requirePageAuth = (inner) => {
  return async (context) => {
    const session = await getSession(context);

    if (!session) {
      context.res.writeHead(307, { Location: '/' });
      context.res.end();

      return {
        props: {},
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }

    return inner ? inner(context, session) : { props: { session } };
  };
};
