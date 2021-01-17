import "react-aspect-ratio/aspect-ratio.css";

import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import { useEffect } from "react";
import { ReactQueryCacheProvider, ReactQueryConfigProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { Hydrate } from "react-query/hydration";

import { Box, makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import MediaQueryHelper from "../components/MediaQueryHelper";
import theme from "../constants/theme";

/* https://react-query.tanstack.com/docs/api#reactqueryconfigprovider  */
const queryConfig = {
  queries: {
    staleTime: 5 * 60 * 1000, // 5 minutes
  },
};

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

  return (
    <>
      <DefaultSeo
        titleTemplate={'Awesome Anime'}
        description="An awesome platform to search, follow, and watch your favorite animes"
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://awesome-anime.vercel.app/',
          site_name: 'Awesome Anime',
        }}
      />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReactQueryConfigProvider config={queryConfig}>
          <ReactQueryCacheProvider>
            <Hydrate state={pageProps.dehydratedState}>
              <div style={{ fontSize: '62.5%' }}>
                <Component {...pageProps} />
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
          </ReactQueryCacheProvider>
        </ReactQueryConfigProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
