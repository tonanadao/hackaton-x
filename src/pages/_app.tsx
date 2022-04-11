import type { AppProps } from "next/app";
import { Layout } from "../components/layout/Layout";
import { GlobalStyles } from "../GlobalStyles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
