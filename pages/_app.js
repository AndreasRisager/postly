import Head from "next/head";
import { CartProvider } from "../helpers/CartContext";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.scss";
import Script from "next/script";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HGYPF8ZF42"
        strategy="afterInteractive"
      />
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-HGYPF8ZF42', {
                  page_path: window.location.pathname,
                });
              `,
        }}
      />
      <Head>
        <title>Postly</title>
        <meta
          name="description"
          content="Se vores unikke udvalg af plakater fra postly, som matcher din stil og personlighed. Find en plakat som du, eller dem du holder af, vil sætte pris på for altid."
        />
        <meta
          name="keywords"
          content="Postly, køb plakater online, køb postly online, online plakatbutik, postly online butik, online posterbutik, postly butik online, køb postly, posters online, plakater, postly plakater"
        />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://postly.netlify.app/" />

        <meta property="og:url" content="https://postly.netlify.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Postly" />
        <meta
          property="og:description"
          content="Se vores udvalg af fantastiske plakater fra postly."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dffpafuyg/image/upload/v1644252262/photo_1513519245088_0e12902e5a38_ixlib_rb_1_2_8fdfa3b08f.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="postly.netlify.app" />
        <meta property="twitter:url" content="https://postly.netlify.app/" />
        <meta name="twitter:title" content="Postly" />
        <meta
          name="twitter:description"
          content="Se vores udvalg af fantastiske plakater fra postly."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dffpafuyg/image/upload/v1644252262/photo_1513519245088_0e12902e5a38_ixlib_rb_1_2_8fdfa3b08f.jpg"
        />
      </Head>
      <SessionProvider session={session}>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
