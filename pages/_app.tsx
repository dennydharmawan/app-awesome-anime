// import "nprogress/nprogress.css";

import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { Router } from "next/dist/client/router";
import NextNprogress from "nextjs-progressbar";
import NProgress from "nprogress";
import { useEffect } from "react";
import { ReactQueryCacheProvider, ReactQueryConfigProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools/dist/react-query-devtools.development";
import { Hydrate } from "react-query/hydration";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "../constants/theme";

/* https://react-query.tanstack.com/docs/api#reactqueryconfigprovider  */
const queryConfig = {
  queries: {
    staleTime: 0, // 5 minutes
  },
};

// https://www.npmjs.com/package/nextjs-progressbar
// https://medium.com/@apalshah/next-js-how-to-make-your-own-progress-bar-indicator-component-easily-445e58777473

const App = ({ Component, pageProps }: AppProps) => {
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
        titleTemplate={'%s | My Site'}
        description="A cool website"
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://my-site.vercel.app/',
          site_name: 'My Site',
        }}
      />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReactQueryConfigProvider config={queryConfig}>
          <ReactQueryCacheProvider>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
              <NextNprogress
                color="#fff"
                options={{ minimum: 0.3, easing: 'ease', speed: 800 }}
              />
              {/* ReactQueryDevTools must be inside ReactQueryCacheProvider or it won't be working */}
              <ReactQueryDevtools initialIsOpen />
            </Hydrate>
          </ReactQueryCacheProvider>
        </ReactQueryConfigProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
