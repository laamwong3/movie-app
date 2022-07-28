import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "../components";
import darkTheme from "../config/darkTheme";
import StateManager from "../contexts/StateManager";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <StateManager>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StateManager>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
