import "../styles/global.css";
import "react-aspect-ratio/aspect-ratio.css";

import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import { useEffect } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";

import { Box, makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import ErrorFallback from "../components/ErrorFallback";
import MediaQueryHelper from "../components/MediaQueryHelper";
import theme from "../constants/theme";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
      mutations: {},
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Provider session={pageProps.session}>
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                  console.log('error boundary');
                }}
              >
                <Component {...pageProps} />
              </ErrorBoundary>
            </Provider>

            {process.env.NODE_ENV === 'development' && <MediaQueryHelper />}
            <NextNprogress
              color="#fff"
              options={{ minimum: 0.3, easing: 'ease', speed: 800 }}
            />
            <ReactQueryDevtools initialIsOpen />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
