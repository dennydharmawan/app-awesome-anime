import "../styles/global.css";
import "react-aspect-ratio/aspect-ratio.css";

import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";

import { Box, makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import MediaQueryHelper from "../components/MediaQueryHelper";
import theme from "../constants/theme";

const useStyles = makeStyles((theme) => ({
  devTools: {
    '& div > div': {
      fontFamily: 'Inter, sans-serif !important',
      fontSize: '14px !important',
    },
  },
}));

const App = ({ Component, pageProps }: AppProps) => {
  const classes = useStyles();

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
            <div style={{ fontSize: '62.5%' }}>
              <Provider session={pageProps.session}>
                <Component {...pageProps} />
              </Provider>
            </div>
            {process.env.NODE_ENV === 'development' && <MediaQueryHelper />}
            <NextNprogress
              color="#fff"
              options={{ minimum: 0.3, easing: 'ease', speed: 800 }}
            />
            <Box className={classes.devTools}>
              <ReactQueryDevtools initialIsOpen />
            </Box>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
