import type { AppProps } from "next/app";
import { Layout } from "../components/layout/Layout";
import { GlobalStyles } from "../GlobalStyles";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-2H06LGWTSD"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2H06LGWTSD');
            `,
        }}
      />
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
