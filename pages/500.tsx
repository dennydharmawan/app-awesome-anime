import { GetStaticPaths, GetStaticProps } from "next";

import ErrorFallback from "../components/ErrorFallback";

const internalServerError = () => {
  return (
    <ErrorFallback
      error={new Error('Oops... you discovered an error page')}
      resetErrorBoundary={() => {}}
    ></ErrorFallback>
  );
};

export default internalServerError;
