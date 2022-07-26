import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Layout } from "../components";
import darkTheme from "../constants/darkTheme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
